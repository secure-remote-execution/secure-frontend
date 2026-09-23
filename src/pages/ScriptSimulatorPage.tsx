import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { scriptService } from '../services/scriptService'
import type { ScriptSimulationResponse } from '../types/device'
import { SimulationHistoryTable } from '../components/SimulationHistoryTable'
import { useAuth } from '../auth/AuthContext'

export function ScriptSimulatorPage() {
  const { user } = useAuth()
  const canSimulate = user?.role === 'ADMIN'
  const [searchParams] = useSearchParams()
  const [deviceId, setDeviceId] = useState(searchParams.get('deviceId') ?? '')
  const [scriptName, setScriptName] = useState('')
  const [parameters, setParameters] = useState('')
  const [result, setResult] = useState<ScriptSimulationResponse | null>(null)
  const [history, setHistory] = useState<ScriptSimulationResponse[]>([])
  const [error, setError] = useState<string | null>(null)

  const loadHistory = () => {
    scriptService.history().then(setHistory).catch(() => undefined)
  }

  useEffect(loadHistory, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await scriptService.simulate({ deviceId, scriptName, parameters })
      setResult(response)
      loadHistory()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <section>
      <h1>Simulador de scripts</h1>
      <p>
        Esta simulación <strong>no ejecuta cambios reales</strong> sobre ningún dispositivo. Solo
        queda registrada como evidencia para el Blue Team.
      </p>

      {canSimulate ? (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
          <label>
            Device ID
            <input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} required />
          </label>
          <label>
            Script
            <input value={scriptName} onChange={(e) => setScriptName(e.target.value)} required />
          </label>
          <label>
            Parámetros (opcional)
            <input value={parameters} onChange={(e) => setParameters(e.target.value)} />
          </label>
          <button type="submit">Simular</button>
        </form>
      ) : (
        <p style={{ color: '#666' }}>
          Tu rol ({user?.role}) solo permite consultar el historial. Se requiere rol ADMIN para
          ejecutar simulaciones.
        </p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p style={{ color: 'green' }}>
          {result.output} (script: {result.scriptName})
        </p>
      )}

      <h2>Historial de simulaciones</h2>
      <SimulationHistoryTable items={history} />
    </section>
  )
}
