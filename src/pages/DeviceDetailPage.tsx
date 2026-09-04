import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deviceService } from '../services/deviceService'
import type { Device } from '../types/device'
import { StatusBadge } from '../components/StatusBadge'

export function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [device, setDevice] = useState<Device | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    deviceService
      .findById(id)
      .then(setDevice)
      .catch((err: Error) => setError(err.message))
  }, [id])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!device) return <p>Cargando...</p>

  return (
    <section>
      <Link to="/">← Volver al inventario</Link>
      <h1>{device.name}</h1>
      <StatusBadge status={device.status} />
      <ul>
        <li>Tipo: {device.type}</li>
        <li>IP: {device.ipAddress}</li>
        <li>Vendor: {device.vendor}</li>
        <li>Responsable: {device.managedBy ?? '—'}</li>
        <li>
          Último cambio de configuración:{' '}
          {device.lastConfigChange ? new Date(device.lastConfigChange).toLocaleString() : '—'}
        </li>
      </ul>
      <Link to={`/scripts?deviceId=${device.id}`}>Simular ejecución de script sobre este dispositivo</Link>
    </section>
  )
}
