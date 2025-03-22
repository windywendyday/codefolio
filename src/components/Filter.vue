<template>
  <el-form
    :model="filterValue"
    ref="filterRef"
  >
    <el-form-item label="公司" prop="companies">
      <div class="company-tags">
        <el-check-tag
          v-for="company in companies"
          :key="company.id"
          :checked="filterValue.companies.some(c => c.id === company.id)"
          @change="(checked) => handleCompanyChange(company, checked)"
        >
          {{ company.companyName }}
        </el-check-tag>
      </div>
    </el-form-item>
    <el-form-item label="岗位" prop="role">
      <el-radio-group v-model="filterValue.role.role">
        <el-radio value="frontEnd">前端</el-radio>
        <el-radio value="backEnd">后端</el-radio>
        <el-radio value="algorithm">算法</el-radio>
        <el-radio value="qa">测试</el-radio>
        <el-radio value="productManager">产品</el-radio>
        <el-radio value="productOperarion">运营</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="简历类型" prop="resumeType">
      <el-radio-group v-model="filterValue.resumeType.type">
        <el-radio value="intern">实习</el-radio>
        <el-radio value="campus">应届校招</el-radio>
        <el-radio value="experienced">社招</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitFilterForm" plain type="primary">提交</el-button>
      <el-button @click="resetFilterForm" plain>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ICompany {
  id: number;
  companyName: string;
}

interface IRole {
  id: number;
  role: string;
}

interface IResumeType {
  id: number;
  type: string;
}

interface IFilter {
  companies: ICompany[];
  role: IRole;
  resumeType: IResumeType;
}

const companies = ref<ICompany[]>([
  { id: 1, companyName: '腾讯' },
  { id: 2, companyName: '阿里巴巴' },
  { id: 3, companyName: '美团' },
  { id: 4, companyName: '字节跳动' },
  { id: 5, companyName: '京东' },
  { id: 6, companyName: '百度' },
  { id: 7, companyName: '快手' },
  { id: 8, companyName: '网易' },
  { id: 9, companyName: '拼多多' },
  { id: 10, companyName: '滴滴' },
  { id: 11, companyName: '华为' },
  { id: 12, companyName: '哔哩哔哩' },
  { id: 13, companyName: '小红书' },
])

const filterValue = ref<IFilter>({
  companies: [],
  role: {} as IRole,
  resumeType: {} as IResumeType,
});

const handleCompanyChange = (company: ICompany, checked: boolean) => {
  if (checked) {
    filterValue.value.companies.push(company)
  } else {
    filterValue.value.companies = filterValue.value.companies.filter(c => c.id !== company.id)
  }
};

const resetFilterForm = () => {
  filterValue.value = {
    companies: [],
    role: {} as IRole,
    resumeType: {} as IResumeType,
  };
};

const submitFilterForm = async () => {};
</script>

<style scoped>
.company-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 4px 0;
}

:deep(.el-check-tag) {
  border-radius: 16px;
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  color: #606266;
  transition: all 0.3s;
}

:deep(.el-check-tag.is-checked) {
  background-color: #ecf5ff;
  border-color: #409EFF;
  color: #409EFF;
}

:deep(.el-check-tag:hover) {
  background-color: #ecf5ff;
  border-color: #409EFF;
  color: #409EFF;
}
</style>
