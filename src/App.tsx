import { NavLink, Route, Routes } from 'react-router-dom'
import { DeviceListPage } from './pages/DeviceListPage'
import { DeviceDetailPage } from './pages/DeviceDetailPage'
import { ScriptSimulatorPage } from './pages/ScriptSimulatorPage'

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-label="Secure inventory">
          <span className="brand-icon">S</span>
          <span>
            <strong>Secure Inventory</strong>
            <small>FDSI · laboratorio 3</small>
          </span>
        </div>
        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Inventario
          </NavLink>
          <NavLink
            to="/scripts"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Simulador de scripts
          </NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<DeviceListPage />} />
          <Route path="/devices/:id" element={<DeviceDetailPage />} />
          <Route path="/scripts" element={<ScriptSimulatorPage />} />
        </Routes>
      </main>
      <footer className="app-footer">Entorno de simulación · Solo lectura y evidencia</footer>
    </div>
  )
}
