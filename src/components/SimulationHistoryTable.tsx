import type { ScriptSimulationResponse } from '../types/device'

export function SimulationHistoryTable({ items }: { items: ScriptSimulationResponse[] }) {
  if (items.length === 0) {
    return <p className="empty-state">Aún no se ha simulado ningún script.</p>
  }

  return <div className="table-scroll"><table>
      <thead>
        <tr>
          <th>Fecha</th><th>Dispositivo</th><th>Script</th><th>Parámetros</th><th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{new Date(item.requestedAt).toLocaleString()}</td><td className="monospace">{item.deviceId}</td><td>{item.scriptName}</td><td>{item.parameters ?? '—'}</td><td>{item.output}</td>
          </tr>
        ))}
      </tbody>
    </table></div>
}
