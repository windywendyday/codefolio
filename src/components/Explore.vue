<template>
<div class="explore-container">
  <el-container>
    <el-aside class="filter">
      <Filter />
    </el-aside>
    <el-main>
      <ResumeGallery />
    </el-main>
  </el-container>
</div>
</template>

<script setup lang="ts">
import Filter from '@/components/Filter.vue'
import ResumeGallery from '@/components/ResumeGallery.vue'
</script>

<style scoped>
.filter{
  padding: 10px 0 0 10px;
}
</style>
