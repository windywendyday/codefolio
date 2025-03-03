<template>
<div class="loginContainer">
  <el-form :model="currentUserInfo" style="max-width: 600px" ref="currentUserInfoRef" :rules="rules">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="currentUserInfo.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="currentUserInfo.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="uploadUserInfo">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { IUserInfo } from '../interface/interface.ts'
import { submitLogInInfo } from '@/api/api.ts'

const currentUserInfo = ref<IUserInfo>({
  email: '',
  password: '',
  uid: '',
  username: ''
})

const currentUserInfoRef = ref<FormInstance>();

const EMAILREG = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

const emailValidator = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('邮箱不能为空'));
    return;
  } else {
    if(!EMAILREG.test(value)) {
      callback(new Error('邮箱格式不正确'));
      return;
    }
    currentUserInfoRef.value?.validateField('email');
  }
}

const passwordValidator = (rule: any, value: string, callback: any) => {
  if (value === ''){
    callback(new Error('密码不能为空'));
    return;
  }else{
    value = value.trim()
    if(value === ''){
      callback(new Error('密码不能为空'));
      return;
    }
    currentUserInfoRef.value?.validateField('password');
  }

}

const rules = reactive<FormRules<IUserInfo>>({
  uid: undefined,
  username: undefined,
  email: [
    { validator: emailValidator, trigger: 'blur' },
  ],
  password: [
    { validator: passwordValidator, trigger: 'blur' },
  ]
});

const uploadUserInfo = (form:FormInstance) => {
  if(!form) return;
  form.validate(async (valid) => {
    if (valid) {
      // 发请求
      await submitLogInInfo(currentUserInfo.value);
      // 跳转到首页

    } else {
      window.alert('密码错误');
      return;
    }
  })
};
</script>

<style scoped>

</style>
