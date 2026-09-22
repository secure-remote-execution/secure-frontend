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

  if (error) return <p className="message error-message">{error}</p>
  if (!device) return <p className="message loading-message">Cargando dispositivo...</p>

  return (
    <section>
      <Link className="back-link" to="/">← Volver al inventario</Link>
      <div className="detail-header">
        <div>
          <span className="eyebrow">Ficha del dispositivo</span>
          <h1>{device.name}</h1>
          <span className="device-type">{device.type}</span>
        </div>
        <StatusBadge status={device.status} />
      </div>
      <div className="detail-panel">
        <dl className="detail-grid">
          <div><dt>Dirección IP</dt><dd>{device.ipAddress}</dd></div>
          <div><dt>Fabricante</dt><dd>{device.vendor}</dd></div>
          <div><dt>Responsable</dt><dd>{device.managedBy ?? '—'}</dd></div>
          <div><dt>Último cambio de configuración</dt><dd>{device.lastConfigChange ? new Date(device.lastConfigChange).toLocaleString() : '—'}</dd></div>
        </dl>
        <Link className="primary-link" to={`/scripts?deviceId=${device.id}`}>Simular ejecución de script <span>→</span></Link>
      </div>
    </section>
  )
}
