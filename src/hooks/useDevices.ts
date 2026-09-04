import { useEffect, useState } from 'react'
import { deviceService } from '../services/deviceService'
import type { Device, DeviceType } from '../types/device'

export function useDevices(type?: DeviceType) {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    deviceService
      .findAll(type)
      .then(setDevices)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [type])

  return { devices, loading, error }
}
