<template>
<div class="upload-process-container">
  <keep-alive>
    <component
      :is="stepComponents[curStep]"
      :curStep="curStep"
      @update-tag-params="updateTagParams"
    />
  </keep-alive>
  <div class="step-indicator">
    <el-button @click="lastStep">上一步</el-button>
    <el-button v-if="curStep === largestStep" @click="submitResumeInfo(uploadResume)">提交</el-button>
    <el-button v-else @click="nextStep">下一步</el-button>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectTagsView from '@/components/SelectTagsView.vue'
// import SecondStep from '@/components/SecondStep.vue'
import UploadView from '@/components/UploadView.vue'
import { submitResume } from '@/api/api.ts'
import type { IUploadResume } from '@/interface/interface.ts'
import { ElMessage } from 'element-plus'
import eventBus from '@/util/eventBus.ts'

const stepComponents = [
  SelectTagsView,
  // SecondStep,
  UploadView,
]

const uploadResume = ref<IUploadResume>({} as IUploadResume);

const largestStep = ref<number>(1);

const curStep = ref<number>(0);

const tagParams = ref({ role: '', company: '', resumeType: '', school: '' });

const nextStep = () => {
  if (curStep.value === 0) {
    if (!tagParams.value.school || !tagParams.value.company || !tagParams.value.resumeType || !tagParams.value.role) {
      console.log(tagParams.value.school, tagParams.value.resumeType, tagParams.value.role, tagParams.value.company);
      ElMessage({
        message: '请确保所有字段填写完毕',
        type: 'warning',
      });
      return;
    }
  }
  curStep.value += 1;
  if (curStep.value > largestStep.value) {
    curStep.value = largestStep.value;
  }
};
const lastStep = () => {
  curStep.value -= 1;
  if (curStep.value < 0) {
    curStep.value = 0
  }
};


// 提交简历信息
const submitResumeInfo = async (uploadResume: IUploadResume) => {
  uploadResume = Object.assign(uploadResume, {
    role: tagParams.value.role,
    level: tagParams.value.resumeType,
    pass_company: tagParams.value.company,
    university: tagParams.value.resumeType,
  });
  console.log('submitResumeInfo', uploadResume);
  const {data, code} = await submitResume(uploadResume);
  console.log('res', data);
  console.log('err', code);
};

eventBus.on('update-tag-params', (params) => {
  updateTagParams(params)
})

eventBus.on('resume-upload-success', (file_key:string) => {
  uploadResume.value.fileKey = file_key
})

// 更新标签参数
const updateTagParams = (params) => {
  tagParams.value = params;
};
</script>

<style scoped>
.upload-process-container {
  width: 100%;
  height: 100%;
}
.step-indicator {
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
