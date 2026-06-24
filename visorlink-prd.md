# PRD y diseño funcional de VisorLink Demo

## Objetivo

VisorLink se plantea como una plataforma SaaS de ciberseguridad enfocada en detectar URLs maliciosas y reducir el impacto de estafas digitales en usuarios individuales, pymes y empresas. El prototipo actual ya comunica el valor del escaneo, las señales evaluadas, el score de riesgo y la futura integración con APIs externas como VirusTotal y Google Safe Browsing, por lo que el siguiente paso razonable es evolucionarlo hacia una experiencia tipo aplicación con navegación completa y flujo demostrable en vivo [file:1].

El objetivo del siguiente demo no es probar la precisión real del motor, sino demostrar el producto, el modelo de negocio y la experiencia end-to-end: captación, registro, uso, historial, upgrading de plan y vista empresarial. La demo debe conservar el lenguaje visual cyber/neon de la landing actual para mantener continuidad de marca y reforzar la percepción de producto tecnológico especializado [file:1].

## Problema

El prototipo ya posiciona a VisorLink como respuesta al aumento de enlaces fraudulentos, phishing y suplantación de marca, usando una promesa clara: verificar si un link es malicioso antes de caer en una estafa [file:1]. Esto encaja con una necesidad transversal que no se limita a un público técnico, sino también a usuarios cotidianos, soporte TI, áreas de seguridad y organizaciones con exposición operativa a campañas maliciosas.

## Propuesta de valor

VisorLink debe venderse como una capa de interpretación y acción, no solo como un agregador de APIs. La ventaja percibida no es únicamente consultar reputación externa, sino convertir múltiples señales en una respuesta clara, rápida y accionable: riesgo, explicación, alertas y recomendaciones [file:1].

## Segmentos

| Segmento | Necesidad | Valor esperado |
|---|---|---|
| Usuario individual | Revisar links antes de abrirlos | Resultado inmediato y fácil de entender |
| Pyme | Proteger equipos no técnicos | Historial, alertas y límites más altos |
| Equipo empresarial | Monitoreo y control operativo | Dashboard, multiusuario, API, reportes |

## Alcance del demo front-only

La siguiente versión debe pasar de landing a web app navegable con flujo completo simulado. Según las reglas de diseño de web apps, la navegación debe ser arquitectura visible, con sidebar para áreas principales, top bar para acciones secundarias y vistas representables por ruta o estado [page:1].

### Módulos del demo

1. **Landing comercial**: mantiene el hero actual, el escaneo inicial, la explicación técnica, las señales y la API, pero añade pricing, casos de uso, FAQ y CTA de registro [file:1].
2. **Autenticación demo**: login, registro y acceso de prueba con estados simulados; la guía de webapp recomienda login centrado, single-column, y registro progresivo desde email [page:1].
3. **Dashboard principal**: KPIs arriba, tendencias en medio y detalle abajo, siguiendo el patrón recomendado para interfaces data-dense [page:1].
4. **Escáner avanzado**: vista dedicada para probar URLs, ver score, señales, explicación y recomendación.
5. **Historial**: tabla o lista con escaneos previos, nivel de riesgo, fecha, origen y acciones.
6. **Planes**: Free, Pro y Enterprise con límites y llamados a conversión.
7. **Vista enterprise**: panel con métricas de equipo, dominios más atacados, volumen, riesgo agregado y opción de solicitar demo.
8. **Configuración**: perfil, organización, API futura, notificaciones y uso del plan.

## Flujo del usuario

### Flujo comercial

Landing → ver propuesta → probar escaneo → revisar resultado → crear cuenta → entrar al dashboard → revisar historial → ver límites del plan → upgrade.

### Flujo demo autenticado

Login/registro → onboarding corto → dashboard → escaneo → resultado → guardar en historial → revisar detalle → explorar planes/empresa.

### Flujo enterprise

Landing o pricing → seleccionar Enterprise → abrir vista con capacidades organizacionales → CTA “Solicitar demo” o “Hablar con ventas”.

## Funcionalidades visibles en la demo

| Función | Estado en demo | Futuro backend |
|---|---|---|
| Escaneo de URL | Simulado con reglas JS | Motor Python + VT + GSB |
| Login/registro | Simulado | Supabase Auth |
| Historial | Datos mock + memoria en sesión | Supabase/Postgres |
| Planes | UI + límites simulados | Billing real |
| Panel empresarial | Datos mock realistas | Multi-tenant + reportes |
| API | Demo visual | REST real |

## Recomendación técnica

Sí, **React** es una muy buena decisión para esta fase. La app ya dejó de ser una sola landing y ahora requiere navegación por vistas, componentes reutilizables, estados simulados, layouts de dashboard y flujos de autenticación, todo lo cual encaja bien con una SPA modular. Además, para una presentación en vivo, React te permite mantener una experiencia fluida sin depender aún del backend.

### Stack recomendado para demo

- React + Vite
- React Router para navegación
- CSS propio o Tailwind con personalización fuerte para conservar el estilo actual
- Estado local con Context o Zustand ligero
- Datos mock en archivos JS/TS
- Gráficas opcionales con Recharts si decides mostrar métricas

La guía de diseño para web apps recomienda URL/state representable, sidebar persistente y un layout de dashboard con KPIs, tendencias y detalles, lo cual encaja muy bien con React Router y componentes reutilizables [page:1].

## Arquitectura funcional propuesta

```text
[Landing]
   ├── Hero + Scan rápido
   ├── Cómo funciona
   ├── Señales
   ├── Casos de uso
   ├── Pricing
   ├── FAQ
   └── CTA -> Login / Demo

[Auth Demo]
   ├── Login
   ├── Registro
   └── Acceso demo

[App]
   ├── Dashboard
   ├── Escanear URL
   ├── Historial
   ├── Alertas
   ├── Planes
   ├── Enterprise
   └── Configuración
```

## Diseño del sistema futuro

### Frontend

- React SPA
- Router para áreas públicas y privadas
- Estado de autenticación desacoplado
- Componentes reutilizables: ScanForm, RiskCard, KPIBlock, PlanCard, Sidebar, AuthPanel

### Backend esperado

- **Supabase** para autenticación, base de datos, almacenamiento y posiblemente funciones ligeras
- **Python** para el motor de análisis, normalización de señales, orquestación con APIs externas y lógica de scoring
- Integraciones previstas: VirusTotal, Google Safe Browsing, WHOIS, listas negras, reglas propias y futuro modelo ML, todas ya insinuadas en el prototipo actual [file:1]

### Esquema lógico inicial

```text
React App
  -> Auth (Supabase)
  -> API Gateway / Backend Python
      -> URL parser
      -> Rule engine
      -> VirusTotal client
      -> Google Safe Browsing client
      -> WHOIS / age lookup
      -> Scoring service
      -> Recommendations service
  -> Supabase Postgres
      -> users
      -> organizations
      -> scans
      -> plans
      -> alerts
      -> api_keys
```

## Entidades recomendadas

| Entidad | Propósito |
|---|---|
| users | Usuarios individuales o miembros de empresa |
| organizations | Cuenta empresarial / multiusuario |
| scans | Historial de análisis |
| scan_signals | Señales detalladas por escaneo |
| subscriptions | Plan activo |
| alerts | Alertas configuradas |
| api_keys | Acceso futuro a API |

## PRD funcional resumido

### Objetivo del producto

Permitir que cualquier usuario o empresa evalúe rápidamente la peligrosidad de una URL y actúe antes de exponerse a fraude digital.

### Métricas de éxito del demo

- El usuario comprende en menos de 30 segundos qué resuelve el producto.
- El flujo de registro y acceso se entiende sin explicaciones externas.
- El dashboard comunica valor de uso continuo, no solo una consulta puntual.
- El modelo Free / Pro / Enterprise se ve claro.
- La demo puede navegarse completa en vivo sin depender del backend.

### Requisitos funcionales

- Escaneo desde landing y desde dashboard.
- Resultado con score, nivel, señales y recomendación.
- Autenticación demo con roles simples.
- Historial de escaneos.
- Pricing con diferencias claras entre planes.
- Vista enterprise con métricas agregadas.
- FAQ y secciones comerciales.
- Adaptación mobile razonable.

### Requisitos no funcionales

- Mantener estilo visual actual tipo cyber/neon, heredando la identidad de la landing existente [file:1].
- Navegación clara, sin recargar con demasiados efectos.
- Demo rápida, fluida y estable para presentación en vivo.
- Sin dependencias obligatorias de backend en esta fase.

## Planes sugeridos

| Plan | Público | Propuesta |
|---|---|---|
| Free | Usuario individual | Escaneos limitados, score básico, historial corto |
| Pro | Freelancers, pymes | Más escaneos, historial extendido, exportación, alertas |
| Enterprise | Equipos y empresas | Multiusuario, dashboard organizacional, API, soporte |

## Qué construir primero

1. Shell de aplicación en React con routing.
2. Reutilizar estética visual de la landing en componentes.
3. Crear módulo Auth demo.
4. Crear Dashboard y Scan Center.
5. Añadir Historial + Pricing + Enterprise.
6. Ajustar narrativa comercial final.

## Recomendación final

Para una presentación navegada en vivo, conviene mostrar VisorLink como un producto SaaS en transición de MVP comercial a plataforma operativa. El mejor siguiente paso es una app React con flujo completo simulado, conservando el look cyber de la landing actual pero organizada con arquitectura de dashboard, autenticación demo, pricing y vista enterprise, porque eso hace tangible la oportunidad de negocio y prepara el terreno para conectar luego Supabase y el backend Python real [file:1][page:1].
