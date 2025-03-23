<template>
<!-- 进度条 -->
<div>
  <el-steps style="max-width: 800px; height: 60px" :active="2" align-center>
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>
  </div>
<div class="upload-resume-container">
  <div class="upload">
    <h3>上传简历</h3>
    <div class="upload-card">
      <el-upload
        class="upload-demo"
        drag
        multiple
      >
        <el-icon><Upload /></el-icon>
        <div class="el-upload__text">
          将文件拖拽至此或 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            仅支持PDF格式，大小在3MB以内
          </div>
        </template>
      </el-upload>
    </div>
  </div>
  <div class="preview">
    <h3>简历预览</h3>
    <div class="preview-card">

    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue'
</script>

<style scoped>
.upload-resume-container {
  display: flex;
  flex-direction: row;
}
.upload{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.upload h3 {
  margin-left: 16%;
}
.upload-card {
  margin-left: 16%;
  width: auto;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview{
  flex-grow: 2;
  display: flex;
  flex-direction: column;
}
.upload-demo {
  width: 80%;
}
.preview h3{
  margin-left: 16%;
}
</style>
