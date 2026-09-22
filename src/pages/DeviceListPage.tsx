import { useState } from 'react'
import { useDevices } from '../hooks/useDevices'
import { DeviceTable } from '../components/DeviceTable'
import type { DeviceType } from '../types/device'

const TYPES: DeviceType[] = ['FIREWALL', 'ROUTER', 'SWITCH']

export function DeviceListPage() {
  const [type, setType] = useState<DeviceType | undefined>(undefined)
  const { devices, loading, error } = useDevices(type)

  return (
    <section>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Panel de operaciones</span>
          <h1>Inventario de dispositivos</h1>
          <p className="page-lead">Consulta el estado y los datos de los equipos registrados.</p>
        </div>
        <span className="read-only-pill">● Solo lectura</span>
      </div>

      <div className="toolbar">
        <label className="field-inline">
          <span>Filtrar por tipo</span>
          <select
            value={type ?? ''}
            onChange={(e) => setType((e.target.value || undefined) as DeviceType | undefined)}
          >
            <option value="">Todos</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p className="message loading-message">Cargando dispositivos...</p>}
      {error && <p className="message error-message">{error}</p>}
      {!loading && !error && <div className="table-panel"><DeviceTable devices={devices} /></div>}
    </section>
  )
}
