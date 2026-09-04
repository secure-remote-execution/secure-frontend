import { api } from './api'
import type { Device, DeviceType } from '../types/device'

export const deviceService = {
  findAll: (type?: DeviceType) =>
    api.get<Device[]>(type ? `/devices?type=${type}` : '/devices'),

  findById: (id: string) => api.get<Device>(`/devices/${id}`),
}
