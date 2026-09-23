import { Link, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { DeviceListPage } from './pages/DeviceListPage'
import { DeviceDetailPage } from './pages/DeviceDetailPage'
import { ScriptSimulatorPage } from './pages/ScriptSimulatorPage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <nav style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Link to="/">Inventario</Link>
        <Link to="/scripts">Simulador de scripts</Link>
        <span style={{ marginLeft: 'auto' }}>
          {user ? (
            <>
              {user.username} ({user.role}){' '}
              <button onClick={logout}>Cerrar sesión</button>
            </>
          ) : (
            <Link to="/login">Iniciar sesión</Link>
          )}
        </span>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DeviceListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices/:id"
          element={
            <ProtectedRoute>
              <DeviceDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scripts"
          element={
            <ProtectedRoute>
              <ScriptSimulatorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
