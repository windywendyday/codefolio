<template>
<div class="homepageContainer">
  <LogIn v-if="!isLogin"></LogIn>
  <SignUp v-else-if="!isSignup"></SignUp>
  <HomePage v-else-if="isLogin"></HomePage>
</div>
</template>

<script setup lang="ts">
// 判断是否登录
import { ref } from 'vue'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'
import HomePage from '@/views/HomePage.vue'

const isLogin = ref(false);
const isSignup = ref(false);

</script>

<style scoped>

</style>
