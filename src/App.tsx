import { Link, Route, Routes } from 'react-router-dom'
import { DeviceListPage } from './pages/DeviceListPage'
import { DeviceDetailPage } from './pages/DeviceDetailPage'
import { ScriptSimulatorPage } from './pages/ScriptSimulatorPage'

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <nav style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
        <Link to="/">Inventario</Link>
        <Link to="/scripts">Simulador de scripts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DeviceListPage />} />
        <Route path="/devices/:id" element={<DeviceDetailPage />} />
        <Route path="/scripts" element={<ScriptSimulatorPage />} />
      </Routes>
    </div>
  )
}
