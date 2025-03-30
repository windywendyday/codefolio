<template>
  <div class="signup-container">
    <h2 class="signup-title">注册账号</h2>
    <el-form
      :model="signUpForm"
      :rules="rules"
      ref="signUpFormRef"
      label-position="top"
      status-icon
      class="signup-form"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="signUpForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="signUpForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="signUpForm.password"
          type="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="button-group">
          <el-button type="primary" @click="submitSignUp">注册</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="login-link">
          已有账号？<a href="javascript:void(0)" @click="goToLogin">立即登录</a>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { IUserInfo } from '../../interface/interface.ts'
import { ElMessage } from 'element-plus'
import { submitSignUpInfo } from '@/api/api.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义表单数据
const signUpForm = ref<IUserInfo>({
  email: '',
  password: '',
  uid: '',
  username: ''
})

// 确认密码
const confirmPassword = ref('')

// 表单引用
const signUpFormRef = ref<FormInstance>()

// 邮箱正则验证
const EMAILREG = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

// 邮箱验证器
const emailValidator = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('邮箱不能为空'))
    return
  } else {
    if(!EMAILREG.test(value)) {
      callback(new Error('邮箱格式不正确'))
      return
    }
    callback()
  }
}

// 用户名验证器
const usernameValidator = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
    return
  } else if (value.length < 3) {
    callback(new Error('用户名长度不能小于3个字符'))
    return
  } else {
    callback()
  }
}

// 密码验证器
const passwordValidator = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
    return
  } else if (value.length < 6) {
    callback(new Error('密码长度不能小于6个字符'))
    return
  } else {
    if (confirmPassword.value !== '') {
      // 如果确认密码不为空，同时验证确认密码
      signUpFormRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

// 确认密码验证器
const confirmPasswordValidator = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
    return
  } else if (value !== signUpForm.value.password) {
    callback(new Error('两次输入的密码不一致'))
    return
  } else {
    callback()
  }
}

// 表单验证规则
const rules = reactive<FormRules>({
  email: [
    { validator: emailValidator, trigger: 'blur' }
  ],
  username: [
    { validator: usernameValidator, trigger: 'blur' }
  ],
  password: [
    { validator: passwordValidator, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: confirmPasswordValidator, trigger: 'blur' }
  ]
})

// 提交注册表单
const submitSignUp = async () => {
  if (!signUpFormRef.value) return

  signUpFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await submitSignUpInfo(signUpForm.value)
        ElMessage.success('注册成功！')
        // 注册成功后跳转到登录页
        router.push('/login')
      } catch (error) {
        ElMessage.error('注册失败，请稍后重试')
        console.error(error)
      }
    } else {
      ElMessage.warning('请正确填写信息')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  signUpFormRef.value?.resetFields()
}

// 跳转到登录页
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.signup-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.signup-title {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
}

.signup-form {
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.login-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.login-link a {
  color: #409EFF;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
