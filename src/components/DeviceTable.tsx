import { Link } from 'react-router-dom'
import type { Device } from '../types/device'
import { StatusBadge } from './StatusBadge'

export function DeviceTable({ devices }: { devices: Device[] }) {
  if (devices.length === 0) {
    return <p className="empty-state">No hay dispositivos para mostrar.</p>
  }

  return <div className="table-scroll"><table>
      <thead>
        <tr>
          <th>Nombre</th><th>Tipo</th><th>IP</th><th>Vendor</th><th>Estado</th><th></th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.name}</td><td>{device.type}</td><td className="monospace">{device.ipAddress}</td><td>{device.vendor}</td><td>
              <StatusBadge status={device.status} />
            </td><td><Link className="table-link" to={`/devices/${device.id}`}>Ver detalle →</Link></td>
          </tr>
        ))}
      </tbody>
    </table></div>
}
