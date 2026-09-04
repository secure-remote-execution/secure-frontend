export type DeviceType = 'FIREWALL' | 'ROUTER' | 'SWITCH'
export type DeviceStatus = 'ONLINE' | 'OFFLINE' | 'UNKNOWN'

export interface Device {
  id: string
  name: string
  type: DeviceType
  ipAddress: string
  vendor: string
  status: DeviceStatus
  lastConfigChange: string | null
  managedBy: string | null
}

export interface ScriptSimulationRequest {
  deviceId: string
  scriptName: string
  parameters?: string
}

export interface ScriptSimulationResponse {
  id: string
  deviceId: string
  scriptName: string
  parameters: string | null
  success: boolean
  output: string
  requestedAt: string
}
