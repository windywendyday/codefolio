<template>
  <div class="preview">
    <h3>简历预览</h3>
    <div class="preview-card">
      <canvas
        ref="canvas"
        @mousedown="startDrag"
        @mouseup="endDrag"
        @mousemove="drag"
        @wheel="zoom"
      ></canvas>
    </div>
    <div class="controls">
      <div class="control-buttons">
        <el-icon @click="zoomIn">
          <Plus />
        </el-icon>
      </div>
      <div class="control-buttons">
        <el-icon @click="zoomOut">
          <Minus />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Minus, Plus } from '@element-plus/icons-vue'

const props = defineProps<{ url: string }>();
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const scale = ref(1);
const offsetX = ref(0);
const offsetY = ref(0);
let isDragging = false;
let startX = 0;
let startY = 0;

watch(
  () => props.url,
  (val) => {
    if (val) {
      drawImage(val);
    }
});

const drawImage = (url: string) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    if (ctx.value) {
      ctx.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
      ctx.value.drawImage(img, offsetX.value, offsetY.value, img.width * scale.value, img.height * scale.value);
    }
  };
};

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    canvas.value.width = 800; // 设置canvas宽度
    canvas.value.height = 600; // 设置canvas高度
    drawImage(props.url);
  }
});

// 拖拽功能
const startDrag = (event: MouseEvent) => {
  isDragging = true;
  startX = event.clientX - offsetX.value;
  startY = event.clientY - offsetY.value;
};

const endDrag = () => {
  isDragging = false;
};

const drag = (event: MouseEvent) => {
  if (isDragging && ctx.value) {
    offsetX.value = event.clientX - startX;
    offsetY.value = event.clientY - startY;
    drawImage(props.url);
  }
};

// 缩放功能
const zoom = (event: WheelEvent) => {
  event.preventDefault();
  const zoomFactor = 0.01;
  if (event.deltaY < 0) {
    scale.value += zoomFactor; // 放大
  } else {
    scale.value = Math.max(0.1, scale.value - zoomFactor); // 缩小，最小为0.1
  }
  drawImage(props.url);
};

const zoomIn = () => {
  scale.value += 0.1;
  drawImage(props.url);
};

const zoomOut = () => {
  scale.value = Math.max(0.1, scale.value - 0.1);
  drawImage(props.url);
};
</script>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  padding-left: 10%;
}

.preview-card {
  width: 80%;
  height: 100%;
}

.controls {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.control-buttons {
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(to bottom, #e0e0e0, #ffffff); /* 渐变背景 */
  border: #606266 1px solid;
  border-radius: 4px;
  margin: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}
</style>
