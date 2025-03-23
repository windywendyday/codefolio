<template>
  <!-- 进度条 -->
  <div>
    <StepsBar :current-step="currentStep" :steps="3" />
  </div>
  <div class="upload-resume-container">
    <UploadCard class="upload-container"/>
    <PreviewResume class="preview-container"/>
  </div>
</template>

<script setup lang="ts">
import StepsBar from '@/components/StepsBar.vue'
import PreviewResume from '@/components/PreviewResume.vue'
import UploadCard from '@/components/UploadCard.vue';
import { ref } from 'vue'

let currentStep = ref(0);
</script>

<style scoped>
.upload-resume-container {
  display: flex;
  flex-direction: row;
}
.upload-container {
  flex-grow: 1;
}
.preview-container {
  flex-grow: 2;
}
</style>
