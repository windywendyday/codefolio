<template>
<div class="faqs-container">
  <div v-for="question in questions" :key="question.id" class="faq-item">
    <div class="faq-header" @click="toggleAnswer(question.id)">
      <el-icon class="expand-icon" :class="{ 'is-active': question.isExpanded }">
        <Plus v-if="!question.isExpanded" />
        <Minus v-else />
      </el-icon>
      <h4 class="question-text">{{ question.question }}</h4>
    </div>
    <el-collapse-transition>
      <div v-show="question.isExpanded" class="answer-content">
        {{ question.answer }}
      </div>
    </el-collapse-transition>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus } from '@element-plus/icons-vue'

interface IQuestion {
  id: number;
  question: string;
  answer: string;
  isExpanded?: boolean;
}

const Questions = [
  {
    id: 1,
    question: 'What is the question1?',
    answer: 'What is the answer1?',
    isExpanded: false
  },
  {
    id: 2,
    question: 'What is the question2?',
    answer: 'What is the answer2?',
    isExpanded: false
  },
  {
    id: 3,
    question: 'What is the question3?',
    answer: 'What is the answer3?',
    isExpanded: false
  }
]

const questions = ref<IQuestion[]>(Questions)

const toggleAnswer = (id: number) => {
  const question = questions.value.find(q => q.id === id)
  if (question) {
    question.isExpanded = !question.isExpanded
  }
}
</script>

<style scoped>
.faqs-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.faq-item {
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.faq-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  background-color: #f5f7fa;
  transition: background-color 0.3s;
}

.faq-header:hover {
  background-color: azure;
}

.expand-icon {
  font-size: 20px;
  margin-right: 10px;
  color: #909399;
  transition: transform 0.3s;
}

.expand-icon.is-active {
  color: gray;
}

.question-text {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.answer-content {
  padding: 15px 20px;
  color: #606266;
  line-height: 1.6;
  background-color: #fff;
}
</style>
