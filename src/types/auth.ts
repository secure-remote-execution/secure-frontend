export type Role = 'VIEWER' | 'ADMIN'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
  role: Role
  expiresAt: string
}
