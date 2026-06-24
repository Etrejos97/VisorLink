# VisorLink — Demo SaaS Frontend

Plataforma demo de detección de URLs maliciosas. React + Vite + TypeScript, lista para presentación comercial en vivo.

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build de producción

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing pública con escaneo demo |
| `/login` | Login simulado |
| `/register` | Registro simulado |
| `/app/dashboard` | Dashboard autenticado |
| `/app/scan` | Centro de escaneo |
| `/app/history` | Historial con filtros |
| `/app/history/:id` | Detalle de escaneo |
| `/app/plans` | Planes Free / Pro / Enterprise |
| `/app/enterprise` | Vista enterprise (solo plan Enterprise) |
| `/app/settings` | Configuración de cuenta |

## Acceso demo rápido

En `/login`, usa los botones de acceso rápido o estas credenciales:

| Perfil | Email | Contraseña |
|--------|-------|------------|
| Free | `free@demo.visorlink.io` | `demo123` |
| Pro | `pro@demo.visorlink.io` | `demo123` |
| Enterprise Admin | `admin@acmecorp.demo` | `demo123` |

También puedes registrarte con cualquier email y contraseña de 6+ caracteres.

## Arquitectura

```
src/
  app/          # Router, layouts, providers
  components/   # UI reutilizable
  data/mock/    # Datos simulados
  pages/        # Vistas públicas y privadas
  services/     # Lógica de escaneo (portada del HTML original)
  styles/       # Tokens y estilos globales
  types/        # Tipos TypeScript
  utils/        # Helpers
```

## Estado demo

- **Auth**: Context en memoria (sin localStorage). Preparado para migrar a Supabase Auth.
- **Escaneos**: Motor de reglas JS portado del prototipo HTML original.
- **Historial**: Mock inicial + escaneos de sesión en memoria.

## Flujo recomendado para demo en vivo

1. Landing → escanear URL de phishing de ejemplo
2. Registro o login demo (Pro o Enterprise)
3. Dashboard → revisar KPIs y actividad
4. Centro de escaneo → nuevo análisis
5. Historial → filtrar y ver detalle
6. Planes → mostrar monetización
7. Enterprise (con admin) → métricas organizacionales

## Próximos pasos (fuera de este demo)

- Supabase Auth + Postgres
- Backend Python (motor real + VirusTotal + GSB)
- Billing y API keys reales

## Stack

- React 19
- Vite 7
- React Router 7
- TypeScript
- CSS Modules + tokens personalizados (identidad cyber/neon del prototipo original)
