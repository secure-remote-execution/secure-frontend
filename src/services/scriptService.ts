import { api } from './api'
import type { ScriptSimulationRequest, ScriptSimulationResponse } from '../types/device'

export const scriptService = {
  simulate: (payload: ScriptSimulationRequest) =>
    api.post<ScriptSimulationResponse>('/scripts/simulate', payload),

  history: () => api.get<ScriptSimulationResponse[]>('/scripts/simulate/history'),
}
