import axios from 'axios'
import type { IUserInfo, IUploadResume } from '../interface/interface.ts'

interface IResponse {
  data: any;
  code: number;
  message: string;
}

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在这里可以添加token等认证信息
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export function submitLogInInfo(data:IUserInfo): Promise<void> {
  return instance.post('/api/login', {data})
}

export function submitSignUpInfo(data:IUserInfo): Promise<void> {
  return instance.post('/api/signup', {data})
}

export function getFAQs(): Promise<IResponse> {
  return instance.get('/api/v1/faqs')
}

export function submitResume(data: IUploadResume): Promise<IResponse> {
  return instance.post('/api/v1/resumes/create', data)
}

export function getSchoolList(): Promise<IResponse> {
  return instance.get('/api/v1/universities')
}
