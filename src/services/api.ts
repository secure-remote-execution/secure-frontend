// Cliente HTTP centralizado. Usa rutas relativas (/api/...) para que
// funcione igual en desarrollo (proxy de Vite) y en producción (proxy de Nginx).
import { clearSession, getSession } from '../auth/authStorage'

const BASE_URL = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const session = getSession()
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (session) {
    headers['Authorization'] = `Bearer ${session.token}`
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  })

  if (!response.ok) {
    if (response.status === 401) {
      clearSession()
      window.dispatchEvent(new Event('auth:unauthorized'))
    }
    const errorBody = await response.json().catch(() => null)
    throw new Error(errorBody?.message ?? `Error ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
