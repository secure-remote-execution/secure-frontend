import { Link } from 'react-router-dom'
import type { Device } from '../types/device'
import { StatusBadge } from './StatusBadge'

export function DeviceTable({ devices }: { devices: Device[] }) {
  if (devices.length === 0) {
    return <p>No hay dispositivos para mostrar.</p>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={cellStyle}>Nombre</th>
          <th style={cellStyle}>Tipo</th>
          <th style={cellStyle}>IP</th>
          <th style={cellStyle}>Vendor</th>
          <th style={cellStyle}>Estado</th>
          <th style={cellStyle}></th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td style={cellStyle}>{device.name}</td>
            <td style={cellStyle}>{device.type}</td>
            <td style={cellStyle}>{device.ipAddress}</td>
            <td style={cellStyle}>{device.vendor}</td>
            <td style={cellStyle}>
              <StatusBadge status={device.status} />
            </td>
            <td style={cellStyle}>
              <Link to={`/devices/${device.id}`}>Ver detalle</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const cellStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  borderBottom: '1px solid #e0e0e0',
}
