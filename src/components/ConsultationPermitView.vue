<template>
  <div>
    <StepsBar :current-step="2" :steps="2" />
    <div>
      <h4>是否接受关于简历的付费咨询</h4>
      <div>
        <el-radio-group v-model="isAccept">
          <el-radio value="true">接受</el-radio>
          <el-radio value="false">不接受</el-radio>
        </el-radio-group>
        <div v-if="isAccept">
          <h5>请留下您的联系方式，以便接收付费咨询的请求</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepsBar from '@/components/StepsBar.vue'
import { ref, watch } from 'vue'

const isAccept = ref<boolean>()

watch(
  () => isAccept,
  (val, prevVal) => {
    if(val) {

    }
  }
)
</script>

<style scoped>

</style>
