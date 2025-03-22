<template>
<div class="home-page">
  <el-container class="container">
    <el-header class="header" height="80px">
      <div @click="goToHome" class="logo">
        <img src="/title.png" alt="" class="title-image">
      </div>
      <div class="navigation">
        <div class="nav-item" :data-index="0" @click="switchCurComponent(0)">Explore</div>
        <div class="nav-item" :data-index="1" @click="switchCurComponent(1)">FAQs</div>
        <div class="nav-indicator"></div>
      </div>
    </el-header>
    <el-main>
      <component
        :is="curComponent"
      />
    </el-main>
  </el-container>
</div>
</template>

<script setup lang="ts">
import Explore from '@/components/Explore.vue';
import FAQs from '@/components/FAQs.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  components: { Explore, FAQs }
})
const curComponent = ref('Explore')
const router = useRouter();

const switchCurComponent = (index: number) => {
  curComponent.value = index === 0 ? 'Explore' : 'FAQs'
}

const goToHome = () => {
  console.log('去首页')
  router.push('/home')
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  height: 80px;
  position: relative;  /* 添加相对定位 */
}
.logo {
  width: auto;
  height: auto;
  z-index: 2;
}
.title-image {
  width: 180px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;  /* 防止图片被压缩 */
}

.navigation {
  position: absolute;  /* 绝对定位 */
  left: 50%;  /* 水平居中 */
  transform: translateX(-50%);  /* 水平居中偏移 */
  display: flex;
  align-items: center;
  gap: 20px;  /* 设置导航项之间的间距 */
  width: 100%;  /* 占据整个header宽度 */
  justify-content: center;  /* 导航项在容器中居中 */
  font-size: 16px;
}

.nav-item {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.3s;
  color: dimgray;
  position: relative;
  z-index: 1;  /* 确保文字在指示器上方 */
}

.nav-item:hover {
  color: black;
}

.nav-indicator {
  position: absolute;
  bottom: 8px;  /* 调整位置到nav-item下方 */
  left: 47%;
  transform: translateX(-50%);  /* 水平居中 */
  height: 12px;
  width: 40px;
  background-color: lightgray;
  border-radius: 1px;
  transition: transform 0.8s ease;
  z-index: 0;
}

/* 为每个导航项设置不同的hover位置 */
.nav-item[data-index="0"]:hover ~ .nav-indicator {
  left: 47%;  /* 调整到第一个标签的位置 */
}

.nav-item[data-index="1"]:hover ~ .nav-indicator {
  left: 53.5%;  /* 调整到第二个标签的位置 */
}
</style>
