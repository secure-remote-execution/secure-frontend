import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { scriptService } from '../services/scriptService'
import type { ScriptSimulationResponse } from '../types/device'
import { SimulationHistoryTable } from '../components/SimulationHistoryTable'

export function ScriptSimulatorPage() {
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
      <div className="page-heading">
        <div>
          <span className="eyebrow">Evidencia controlada</span>
          <h1>Simulador de scripts</h1>
          <p className="page-lead">
        Esta simulación <strong>no ejecuta cambios reales</strong> sobre ningún dispositivo. Solo
        queda registrada como evidencia para el Blue Team.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="simulation-form">
        <label className="field">
          <span>Device ID</span>
          <input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} required />
        </label>
        <label className="field">
          <span>Script</span>
          <input value={scriptName} onChange={(e) => setScriptName(e.target.value)} required />
        </label>
        <label className="field">
          <span>Parámetros <em>(opcional)</em></span>
          <input value={parameters} onChange={(e) => setParameters(e.target.value)} />
        </label>
        <button className="primary-button" type="submit">Ejecutar simulación <span>→</span></button>
      </form>

      {error && <p className="message error-message">{error}</p>}
      {result && <p className="message success-message">
          {result.output} (script: {result.scriptName})
        </p>}

      <div className="section-heading"><h2>Historial de simulaciones</h2><span>{history.length} registros</span></div>
      <div className="table-panel"><SimulationHistoryTable items={history} /></div>
    </section>
  )
}
