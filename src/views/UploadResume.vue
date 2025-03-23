<template>
<div class="upload-process-container">
  <component
    :is="stepComponents[curStep]"
  />
</div>
</template>

<script setup lang="ts">
import FirstStep from '@/components/FirstStep.vue'
import SecondStep from '@/components/SecondStep.vue'
import ThirdStep from '@/components/ThirdStep.vue'

const stepComponents = [
  'FirstStep',
  'SecondStep',
  'ThirdStep',
];


const curStep: number = 0;
</script>

<style scoped>

</style>
