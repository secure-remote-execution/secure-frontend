# Secure Product Challenge — Frontend

Interfaz web para consultar el inventario ficticio de dispositivos de red y simular
la ejecución de scripts, para el **Laboratorio 3/4 (FDSI)**.

> 🔒 Desde el Laboratorio 4, todas las páginas requieren login (JWT contra el backend).
> El token se guarda en `localStorage` y se adjunta automáticamente en cada request.
> Un `401` del backend cierra la sesión local. Credenciales de prueba: ver el README
> del backend (`admin`/`Admin123!` y `viewer`/`Viewer123!`).

## Stack

React + Vite + TypeScript + react-router-dom.

## Estructura

```
pages/        → vistas de alto nivel (DeviceListPage, DeviceDetailPage, ScriptSimulatorPage, LoginPage)
components/   → UI reutilizable (DeviceTable, StatusBadge, SimulationHistoryTable)
services/     → llamadas HTTP al backend (api.ts, deviceService.ts, scriptService.ts, authService.ts)
auth/         → sesión JWT (AuthContext, ProtectedRoute, authStorage)
types/        → interfaces TypeScript espejo de los DTOs del backend
hooks/        → hooks reutilizables (useDevices)
```

## Cómo levantarlo

```bash
npm install
npm run dev
```

Corre en `http://localhost:5173`. En desarrollo, Vite proxea `/api` hacia
`http://localhost:8081` (backend Spring Boot) — ver `vite.config.ts`.

## Build de producción

```bash
npm run build
```

Genera `dist/`, que Nginx sirve directamente (ver repo de infraestructura /
config de Nginx del backend).
