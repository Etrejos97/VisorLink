# Brief de implementación React para VisorLink

## Decisión

Sí, conviene pasar a una estructura tipo app con React. La razón principal es que el proyecto ya no es solo una landing: ahora necesita vistas diferenciadas, componentes reutilizables, simulación de autenticación, navegación privada y dashboard, todo en una demo navegable y estable para presentación en vivo [page:1][file:1].

## Rutas sugeridas

- `/` Landing
- `/login` Login demo
- `/register` Registro demo
- `/app/dashboard` Dashboard
- `/app/scan` Centro de escaneo
- `/app/history` Historial
- `/app/plans` Planes
- `/app/enterprise` Vista enterprise
- `/app/settings` Configuración

## Componentes base

- `AppShell`
- `Sidebar`
- `Topbar`
- `ScanInput`
- `ScanResultCard`
- `SignalGrid`
- `PlanCard`
- `KpiCard`
- `HistoryTable`
- `AuthCard`
- `EnterpriseMetrics`

## Estado demo

- Usuario actual
- Plan actual
- Historial mock
- Escaneo actual
- Alertas
- Organización activa

## Roles demo

- Individual
- Pro
- Enterprise Admin

## Historia de la demo

1. Entrar por landing.
2. Hacer escaneo rápido.
3. Crear cuenta demo.
4. Entrar al dashboard.
5. Ver historial y métricas.
6. Cambiar a vista enterprise.
7. Abrir planes y justificar monetización.

## Principio visual

Mantener el ADN cyber actual: fondo oscuro, acentos neón azul/cyan, tipografía tecnológica y bloques con apariencia de consola o terminal premium, porque esa identidad ya diferencia al producto y conecta con el mensaje de ciberseguridad [file:1].
