import type { ScriptSimulationResponse } from '../types/device'

export function SimulationHistoryTable({ items }: { items: ScriptSimulationResponse[] }) {
  if (items.length === 0) {
    return <p>Aún no se ha simulado ningún script.</p>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={cellStyle}>Fecha</th>
          <th style={cellStyle}>Dispositivo</th>
          <th style={cellStyle}>Script</th>
          <th style={cellStyle}>Parámetros</th>
          <th style={cellStyle}>Resultado</th>
          <th style={cellStyle}>Ejecutado por</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td style={cellStyle}>{new Date(item.requestedAt).toLocaleString()}</td>
            <td style={cellStyle}>{item.deviceId}</td>
            <td style={cellStyle}>{item.scriptName}</td>
            <td style={cellStyle}>{item.parameters ?? '—'}</td>
            <td style={cellStyle}>{item.output}</td>
            <td style={cellStyle}>{item.performedBy}</td>
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
