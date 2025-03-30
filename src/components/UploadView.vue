<template>
  <div>
    <StepsBar :current-step="1" :steps="2" />
  </div>
  <div class="upload-resume-container">
    <UploadCard class="upload-container" @upload-success="uploadSuccess"/>
    <div class="preview-container">
        <PreviewResume :url="imgURL"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepsBar from '@/components/StepsBar.vue'
import PreviewResume from '@/components/PreviewResume.vue'
import UploadCard from '@/components/UploadCard.vue';
import { ref, watch } from 'vue'
import eventBus from '@/util/eventBus.ts'

const imgURL = ref<string>('');

watch(
  () => imgURL.value,
  (val, prevVal) => {
    imgURL.value = val
    console.log('imgURL.value', imgURL.value)
  }
)

const uploadSuccess = (data) => {
  imgURL.value = data.data.image_url
  eventBus.emit('resume-upload-success', data.data.file_key)
};
</script>

<style scoped>
.upload-resume-container {
  display: flex;
  flex-direction: row;
}
.upload-container {
  width: 40%;
}
.preview-container {
  width: 60%;
}
</style>
