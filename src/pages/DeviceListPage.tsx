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
      <h1>Inventario de dispositivos</h1>
      <p>Datos ficticios — Laboratorio 3, FDSI.</p>

      <div style={{ marginBottom: 16 }}>
        <label>
          Filtrar por tipo:{' '}
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

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <DeviceTable devices={devices} />}
    </section>
  )
}
