<template>
    <div class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
        :class="{
          'is-active': currentStep >= index,
          'is-completed': currentStep > index
        }"
      >
        <div class="step-dot"></div>
        <div
          v-if="index < steps - 1"
          class="step-line"
          :class="{ 'is-active': currentStep > index }"
        ></div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  steps: number;
  currentStep: number;
}

const props = defineProps<IProps>();

// 确保类型为number
const steps = computed(() => Number(props.steps));
const currentStep = computed(() => Number(props.currentStep));
</script>

<style scoped>
.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.step-item {
  display: flex;
  align-items: center;
  position: relative;
}

.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #dcdfe6;
  transition: all 0.3s ease;
}

.step-line {
  width: 40px;
  height: 2px;
  background-color: #dcdfe6;
  margin: 0 4px;
  transition: all 0.3s ease;
}

.step-item.is-active .step-dot {
  background-color: #606266;
  transform: scale(1.2);
}

.step-item.is-completed .step-dot {
  background-color: #606266;
}

.step-line.is-active {
  background-color: #606266;
}
</style>
