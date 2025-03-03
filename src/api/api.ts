import axios from 'axios'
import type { IUserInfo } from '../interface/interface.ts'

export function submitLogInInfo(data:IUserInfo): Promise<void> {
  return axios.post('/api/login', {data})
}
