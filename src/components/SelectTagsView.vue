<template>
  <div class="second-step-container">
    <div>
      <StepsBar :current-step="0" :steps="2" />
    </div>
    <div class="tag-container">
      <h3>选择标签</h3>
      <div>
        <SelectableTags
          title="投递方向"
          :tags="roleTags"
          :allow-select-all="false"
          class="tag-items"
          v-model="tagParams.role"
          @change="updateTagParams('role', tagParams.role)"
        />
        <SelectableTags
          title="公司选择"
          :tags="companyTags"
          :allow-select-all="false"
          class="tag-items"
          v-model="tagParams.company"
          @change="updateTagParams('company', tagParams.company)"
        />
        <SelectableTags
          title="求职类型"
          :tags="resumeTags"
          :allow-select-all="false"
          class="tag-items"
          v-model="tagParams.resumeType"
          @change="updateTagParams('resumeType', tagParams.resumeType)"
        />
        <div class="tag-title">学校名称</div>
        <el-select
          label="学校名称"
          v-model="tagParams.school"
          filterable
          placeholder="请输入学校名称"
          @change="updateTagParams('school', tagParams.school)"
        >
          <el-option
            v-for="item in schoolOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StepsBar from '@/components/StepsBar.vue'
import SelectableTags from '@/components/SelectableTags.vue'
import { getSchoolList } from '@/api/api.ts'
import { isSuccess } from '@/util/utils.ts'
import { ElMessage } from 'element-plus'
import eventBus from '@/util/eventBus.ts'

interface IProps {
  curStep: number;
}

interface ITag {
  label: string;
  value: number;
  disabled: boolean;
}

interface ITagParams {
  role: string,
  company: string,
  resumeType: string,
  school: string,
}

const props = defineProps<IProps>();

const roleTags = ref<ITag[]>([] as ITag[]);
const companyTags = ref<ITag[]>([] as ITag[]);
const resumeTags = ref<ITag[]>([] as ITag[]);

const tagParams = ref<ITagParams>({
  role: '',
  company: '',
  resumeType: '',
  school: '',
});

const schoolOptions = ref<{ [key: string]: number }>({})

// 更新标签参数并触发事件
const updateTagParams = (key: keyof ITagParams, value: string) => {
  tagParams.value[key] = value;
  eventBus.emit('update-tag-params', tagParams.value);
};

// 从localStorage读取标签数据
const loadTagsFromLocalStorage = () => {
  try {
    const savedRoleTags = localStorage.getItem('roleTags')
    const savedCompanyTags = localStorage.getItem('companyTags')
    const savedResumeTags = localStorage.getItem('resumeTags')

    if (savedRoleTags) roleTags.value = JSON.parse(savedRoleTags) || [] as ITag[];
    if (savedCompanyTags) companyTags.value = JSON.parse(savedCompanyTags) || [] as ITag[];
    if (savedResumeTags) resumeTags.value = JSON.parse(savedResumeTags) || [] as ITag[];
  } catch (error) {
    console.error('从localStorage读取标签数据失败:', error)
  }
}

// 获取学校数据
const loadSchoolDataFromLocalStorage = async () => {
  try {
    const { code, data, message } = await getSchoolList();
    if(!isSuccess(code)) {
      ElMessage({
        message: message,
        type: 'warning',
      });
      return ;
    }

    schoolOptions.value = data;
  } catch (error) {
    console.error('从localStorage读取学校数据失败:', error)
  }
}

// 组件挂载时读取数据
onMounted(() => {
  loadTagsFromLocalStorage()
  loadSchoolDataFromLocalStorage()
})
</script>

<style scoped>
.second-step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tag-container {
  display: flex;
  flex-direction: column;
}
.tag-title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}
.tag-items {
  margin-bottom: 1.5rem;
}
</style>
