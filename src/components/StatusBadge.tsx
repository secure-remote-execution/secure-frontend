import type { DeviceStatus } from '../types/device'

const COLORS: Record<DeviceStatus, string> = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  UNKNOWN: 'unknown',
}

export function StatusBadge({ status }: { status: DeviceStatus }) {
  return (
    <span className={`status-badge ${COLORS[status]}`}>
      <span className="status-dot" />
      {status}
    </span>
  )
}
