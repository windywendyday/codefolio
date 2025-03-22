import axios from 'axios'
import type { IUserInfo } from '../interface/interface.ts'

export function submitLogInInfo(data:IUserInfo): Promise<void> {
  return axios.post('/api/login', {data})
}

export function submitSignUpInfo(data:IUserInfo): Promise<void> {
  return axios.post('/api/signup', {data})
}
