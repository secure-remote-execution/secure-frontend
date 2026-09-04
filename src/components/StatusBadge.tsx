import type { DeviceStatus } from '../types/device'

const COLORS: Record<DeviceStatus, string> = {
  ONLINE: '#2e7d32',
  OFFLINE: '#c62828',
  UNKNOWN: '#757575',
}

export function StatusBadge({ status }: { status: DeviceStatus }) {
  return (
    <span
      style={{
        color: '#fff',
        backgroundColor: COLORS[status],
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  )
}
