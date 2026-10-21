import { api } from './api'
import type { LoginRequest, LoginResponse } from '../types/auth'

export const authService = {
  login: (payload: LoginRequest) => api.post<LoginResponse>('/auth/login', payload),
}
