<template>
  <div class="upload-container">
    <h3>上传简历</h3>
    <div class="upload-card">
      <el-upload
        class="upload-demo"
        drag
        multiple
        accept=".pdf"
        :limit="1"
        :before-upload="handleChange"
        :http-request="handleUpload"
        v-model="resumeFile"
      >
        <el-icon><Upload /></el-icon>
        <div class="el-upload__text">
          将文件拖拽至此或 <em>点击上传</em>
        </div>
      </el-upload>
      <div id="tip">
          <span class="el-upload__tip">
          格式：PDF
        </span>
        <span class="el-upload__tip">
          大小：1MB以内
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import axios from 'axios'

const resumeFile = ref<File>();

// 文件大小和类型验证
const handleChange = (file: File) => {
  const size = file.size
  const type = file.type

  // 验证文件大小
  if(size > 1048576) {
    ElMessage({
      message: '上传的文件大小不能超过1MB！',
      type: 'warning',
    });
    return false;
  }

  // 验证文件类型
  if(type !== 'application/pdf') {
    ElMessage({
      message: '只能上传PDF格式的文件！',
      type: 'warning',
    });
    return false;
  }

  return true;
}

// 处理文件上传
const handleUpload = async (options: any) => {
  const file = options.file

  // 创建FormData对象
  const formData = new FormData()
  formData.append('file', file)

  try {
    // 显示上传中提示
    ElMessage({
      message: '正在上传...',
      type: 'info',
    });

    // 发送上传请求
    const response = await axios.post('/api/v1/resumes/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // 上传成功
    ElMessage({
      message: '上传成功！',
      type: 'success',
    });

    // 清空文件
    resumeFile.value = undefined

    // 触发父组件的成功回调（如果有的话）
    emit('upload-success', response.data)

  } catch (error: any) {
    // 上传失败
    ElMessage({
      message: error.response?.data?.message || '上传失败，请重试！',
      type: 'error',
    });
  }
}

// 定义事件
const emit = defineEmits(['upload-success'])
</script>

<style scoped>
.upload-container{
  display: flex;
  flex-direction: column;
}
.upload-container h3 {
  margin-left: 16%;
}
.upload-card {
  margin-left: 16%;
  width: auto;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upload-demo {
  width: 80%;
}
#tip{
  display: flex;
}
.el-upload__tip {
  font-size: 10px;
  color: #909399;
  margin: 0 10px;
  flex-grow: 1;
}
</style>
