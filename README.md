# Secure Product Challenge — Frontend

Interfaz web para consultar el inventario ficticio de dispositivos de red y simular
la ejecución de scripts, para el **Laboratorio 3 (FDSI)**.

> ⚠️ Sin login ni manejo de tokens — eso se agrega en el Laboratorio 4.

## Stack

React + Vite + TypeScript + react-router-dom.

## Estructura

```
pages/        → vistas de alto nivel (DeviceListPage, DeviceDetailPage, ScriptSimulatorPage)
components/   → UI reutilizable (DeviceTable, StatusBadge, SimulationHistoryTable)
services/     → llamadas HTTP al backend (api.ts, deviceService.ts, scriptService.ts)
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
