<template>
<div class="upload-process-container">
  <component
    :is="stepComponents[curStep]"
    :curStep="curStep"
  />
  <el-button @click="lastStep">上一步</el-button>
  <el-button @click="nextStep">下一步</el-button>
</div>
</template>

<script setup lang="ts">
import FirstStep from '@/components/FirstStep.vue'
import SecondStep from '@/components/SecondStep.vue'
import ThirdStep from '@/components/ThirdStep.vue'
import { ref } from 'vue'

const stepComponents = [
  FirstStep,
  SecondStep,
  ThirdStep
]

const curStep = ref<number>(0);

const nextStep = () => {
  curStep.value += 1;
  if (curStep.value > 2) {
    curStep.value = 2
  }
};
const lastStep = () => {
  curStep.value -= 1;
  if (curStep.value < 0) {
    curStep.value = 0
  }
};
</script>

<style scoped>
.upload-process-container {
  width: 100%;
  height: 100%;
}
</style>
