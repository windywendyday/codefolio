<template>
  <div class="resume-gallery">
    <div class="gallery-container">
      <div
        v-for="resume in resumes"
        :key="resume.id"
        class="gallery-item"
        @click="handleResumeClick(resume)"
      >
        <el-card
          class="resume-card"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="image-container">
            <el-image
              :src="resume.imageUrl"
              fit="cover"
              lazy
              loading="lazy"
              class="resume-image"
            >
              <template #placeholder>
                <div class="image-placeholder">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
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
          </div>

          <div class="content-container">
            <h3 class="resume-title">{{ resume.title }}</h3>
            <div class="user-info">
              <el-avatar :size="24" :src="resume.userAvatar" />
              <span class="username">{{ resume.username }}</span>
              <span class="date">{{ resume.date }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <ResumeDetail
      v-model="dialogVisible"
      :resume="selectedResume"
      @consult="handleConsult"
    />
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { Picture } from '@element-plus/icons-vue'
import ResumeDetail from './ResumeDetail.vue'

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

const dialogVisible = ref(false)
const selectedResume = ref<IResume | null>(null)

const resumes = ref<IResume[]>([
  {
    id: 1,
    title: '2024年腾讯前端开发工程师简历',
    imageUrl: 'https://example.com/resume1.jpg',
    tags: ['前端', 'React', 'Vue'],
    username: '张三',
    userAvatar: 'https://example.com/avatar1.jpg',
    date: '2024-03-20',
    description: '3年前端开发经验，精通React和Vue技术栈，有大型项目经验。',
    email: 'zhangsan@example.com',
    phone: '13800138000'
  },
  {
    id: 2,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 3,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 4,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 5,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 6,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 7,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 8,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  {
    id: 9,
    title: '字节跳动后端开发工程师简历',
    imageUrl: 'https://example.com/resume2.jpg',
    tags: ['后端', 'Java', 'Spring'],
    username: '李四',
    userAvatar: 'https://example.com/avatar2.jpg',
    date: '2024-03-19'
  },
  // 添加更多示例数据...
])

const handleResumeClick = (resume: IResume) => {
  selectedResume.value = resume
  dialogVisible.value = true
}

const handleConsult = (resumeId: number) => {
  // 这里可以添加咨询请求的处理逻辑
  console.log('咨询简历ID:', resumeId)
}
</script>

<style scoped>
.resume-gallery {
  padding: 10px 0 0 10px;
}

.gallery-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.gallery-item {
  width: 320px;
  flex-shrink: 0;
  cursor: pointer;
}

.resume-card {
  width: 100%;
  transition: all 0.3s;
}

.resume-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.resume-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.tags-container {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag-item {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  color: #606266;
}

.content-container {
  padding: 15px;
}

.resume-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #303133;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-size: 14px;
}

.username {
  color: #606266;
}

.date {
  margin-left: auto;
}

@media screen and (max-width: 960px) {
  .gallery-item {
    width: calc(50% - 10px);
  }
}

@media screen and (max-width: 640px) {
  .gallery-item {
    width: 100%;
  }
}
</style>
