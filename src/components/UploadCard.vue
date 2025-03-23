<template>
  <div class="upload-container">
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
      </el-upload>
      <div id="tip">
          <span class="el-upload__tip">
          格式：PDF
        </span>
        <span class="el-upload__tip">
          大小：3MB以内
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Upload } from '@element-plus/icons-vue'
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
