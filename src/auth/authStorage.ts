import type { Role } from '../types/auth'

const STORAGE_KEY = 'spc_auth_session'

export interface StoredSession {
  token: string
  username: string
  role: Role
}

export function getSession(): StoredSession | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredSession
  } catch {
    return null
  }
}

export function setSession(session: StoredSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}
