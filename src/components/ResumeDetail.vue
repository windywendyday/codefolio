<template>
  <el-dialog
    v-model="dialogVisible"
    :title="resume?.title"
    width="60%"
    top="8vh"
    :close-on-click-modal="false"
    class="resume-detail-dialog"
    style="border-radius: 12px"
  >
    <div v-if="resume" class="resume-detail-content">
      <div class="resume-image-section">
        <el-image
          :src="resume.imageUrl"
          fit="contain"
          class="resume-detail-image"
        >
          <template #placeholder>
            <div class="image-placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>

      <div class="resume-info-section">
        <div class="info-header">
          <el-avatar :size="40" :src="resume.userAvatar" />
          <div class="user-basic-info">
            <h3>{{ resume.username }}</h3>
            <p class="date">{{ resume.date }}</p>
          </div>
        </div>

        <div class="info-content">
          <div class="tags-container">
            <el-tag
              v-for="tag in resume.tags"
              :key="tag"
              size="small"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
          </div>

          <div class="description">
            <h4>简历描述</h4>
            <p>{{ resume.description || '暂无描述' }}</p>
          </div>

          <div class="contact-info">
            <h4>联系方式</h4>
            <p>邮箱：{{ resume.email || '未提供' }}</p>
            <p>电话：{{ resume.phone || '未提供' }}</p>
          </div>
        </div>

        <div class="action-section">
          <el-button type="primary" size="large" @click="handleConsult">
            请求咨询
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface IResume {
  id: number;
  title: string;
  imageUrl: string;
  tags: string[];
  username: string;
  userAvatar: string;
  date: string;
  description?: string;
  email?: string;
  phone?: string;
}

const props = defineProps<{
  modelValue: boolean;
  resume: IResume | null;
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'consult', resumeId: number): void;
}>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleConsult = () => {
  if (!props.resume) return
  ElMessage.success('咨询请求已发送，我们会尽快与您联系！')
  emit('consult', props.resume.id)
}
</script>

<style scoped>
/deep/ .el-dialog {
  border-radius: 16px !important;
}

.resume-detail-dialog {
  padding: 0;
  height: calc(90vh - 120px); /* 减去头部和底部的高度 */
  overflow: hidden;
}

.resume-detail-content {
  display: flex;
  height: 580px;
}

.resume-image-section {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.resume-detail-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.resume-info-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
  flex-shrink: 0;
}

.user-basic-info h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.date {
  margin: 5px 0 0;
  font-size: 14px;
  color: #909399;
}

.info-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.info-content::-webkit-scrollbar {
  width: 6px;
}

.info-content::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.info-content::-webkit-scrollbar-track {
  background-color: #f5f7fa;
  border-radius: 3px;
}

.tags-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag-item {
  background-color: #f5f7fa;
  border: none;
  color: #606266;
}

.description, .contact-info {
  margin-bottom: 20px;
}

.description h4, .contact-info h4 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #303133;
}

.description p, .contact-info p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}

.action-section {
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
  text-align: center;
  flex-shrink: 0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 24px;
}
</style>
