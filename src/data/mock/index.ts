import type { User, Plan, ScanResult, EnterpriseMetrics } from '@/types';

export const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'free@demo.visorlink.io': {
    password: 'demo123',
    user: {
      id: 'usr_free_01',
      email: 'free@demo.visorlink.io',
      name: 'Ana García',
      role: 'individual',
      plan: 'free',
      avatarInitials: 'AG',
    },
  },
  'pro@demo.visorlink.io': {
    password: 'demo123',
    user: {
      id: 'usr_pro_01',
      email: 'pro@demo.visorlink.io',
      name: 'Carlos Mendoza',
      role: 'pro',
      plan: 'pro',
      avatarInitials: 'CM',
    },
  },
  'admin@acmecorp.demo': {
    password: 'demo123',
    user: {
      id: 'usr_ent_01',
      email: 'admin@acmecorp.demo',
      name: 'Laura Vega',
      role: 'enterprise_admin',
      plan: 'enterprise',
      organizationId: 'org_acme_01',
      organizationName: 'Acme Corp Security',
      avatarInitials: 'LV',
    },
  },
};

export const DEMO_QUICK_ACCESS: { label: string; email: string; plan: string }[] = [
  { label: 'Usuario Free', email: 'free@demo.visorlink.io', plan: 'Free' },
  { label: 'Usuario Pro', email: 'pro@demo.visorlink.io', plan: 'Pro' },
  { label: 'Enterprise Admin', email: 'admin@acmecorp.demo', plan: 'Enterprise' },
];

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/mes',
    description: 'Protección básica para uso personal',
    features: [
      '50 escaneos al mes',
      'Score de riesgo básico',
      'Historial de 7 días',
      'Señales principales',
      'Soporte por email',
    ],
    limits: {
      scansPerMonth: 50,
      historyDays: 7,
      users: 1,
      apiAccess: false,
      alerts: false,
      export: false,
    },
    cta: 'Plan actual',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/mes',
    description: 'Para freelancers y pymes que necesitan más control',
    features: [
      '500 escaneos al mes',
      'Historial de 90 días',
      'Alertas por email',
      'Exportación CSV',
      'Análisis extendido de señales',
      'Soporte prioritario',
    ],
    limits: {
      scansPerMonth: 500,
      historyDays: 90,
      users: 5,
      apiAccess: false,
      alerts: true,
      export: true,
    },
    highlighted: true,
    cta: 'Actualizar a Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Monitoreo organizacional, API y equipos de seguridad',
    features: [
      'Escaneos ilimitados',
      'Multiusuario y SSO',
      'Dashboard organizacional',
      'API REST completa',
      'Reportes ejecutivos',
      'SLA y soporte dedicado',
    ],
    limits: {
      scansPerMonth: 'unlimited',
      historyDays: 'unlimited',
      users: 'unlimited',
      apiAccess: true,
      alerts: true,
      export: true,
    },
    cta: 'Solicitar demo',
  },
];

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600000).toISOString();

export const INITIAL_SCAN_HISTORY: ScanResult[] = [
  {
    id: 'scan_1719247200001_seed01',
    url: 'https://secure-login-bancolombia.xyz/verify?token=8a3f',
    score: 87,
    nivel: 'alto',
    signals: [
      { name: 'SUPLANTACIÓN MARCA', value: 'DETECTADA', nivel: 'alto' },
      { name: 'TLD', value: 'ALTO RIESGO', nivel: 'alto' },
      { name: 'KEYWORDS PHISHING', value: '2 HALLADAS', nivel: 'alto' },
      { name: 'IP EN URL', value: 'NO', nivel: 'bajo' },
      { name: 'URL ACORTADA', value: 'NO', nivel: 'bajo' },
      { name: 'HTTPS', value: 'SÍ', nivel: 'bajo' },
    ],
    recommendation:
      'No abras este enlace. El dominio presenta múltiples señales de phishing. Reporta el mensaje y elimínalo.',
    scannedAt: hoursAgo(2),
    source: 'dashboard',
    status: 'completed',
    durationMs: 312,
  },
  {
    id: 'scan_1719247200002_seed02',
    url: 'https://paypal-account-suspended.top/restore',
    score: 78,
    nivel: 'alto',
    signals: [
      { name: 'SUPLANTACIÓN MARCA', value: 'DETECTADA', nivel: 'alto' },
      { name: 'TLD', value: 'ALTO RIESGO', nivel: 'alto' },
      { name: 'KEYWORDS PHISHING', value: '2 HALLADAS', nivel: 'alto' },
      { name: 'IP EN URL', value: 'NO', nivel: 'bajo' },
      { name: 'URL ACORTADA', value: 'NO', nivel: 'bajo' },
      { name: 'HTTPS', value: 'SÍ', nivel: 'bajo' },
    ],
    recommendation:
      'No abras este enlace. El dominio presenta múltiples señales de phishing. Reporta el mensaje y elimínalo.',
    scannedAt: hoursAgo(5),
    source: 'extension',
    status: 'completed',
    durationMs: 289,
  },
  {
    id: 'scan_1719247200003_seed03',
    url: 'https://bit.ly/3xK9mP2',
    score: 42,
    nivel: 'medio',
    signals: [
      { name: 'SUPLANTACIÓN MARCA', value: 'NINGUNA', nivel: 'bajo' },
      { name: 'TLD', value: 'NORMAL', nivel: 'bajo' },
      { name: 'KEYWORDS PHISHING', value: 'NINGUNA', nivel: 'bajo' },
      { name: 'IP EN URL', value: 'NO', nivel: 'bajo' },
      { name: 'URL ACORTADA', value: 'SÍ', nivel: 'medio' },
      { name: 'HTTPS', value: 'SÍ', nivel: 'bajo' },
    ],
    recommendation:
      'Precaución: hay señales sospechosas. Verifica el remitente por un canal oficial antes de ingresar credenciales.',
    scannedAt: hoursAgo(8),
    source: 'api',
    status: 'completed',
    durationMs: 245,
  },
  {
    id: 'scan_1719247200004_seed04',
    url: 'https://www.bancolombia.com/personas',
    score: 8,
    nivel: 'bajo',
    signals: [
      { name: 'SUPLANTACIÓN MARCA', value: 'NINGUNA', nivel: 'bajo' },
      { name: 'TLD', value: 'NORMAL', nivel: 'bajo' },
      { name: 'KEYWORDS PHISHING', value: 'NINGUNA', nivel: 'bajo' },
      { name: 'IP EN URL', value: 'NO', nivel: 'bajo' },
      { name: 'URL ACORTADA', value: 'NO', nivel: 'bajo' },
      { name: 'HTTPS', value: 'SÍ', nivel: 'bajo' },
    ],
    recommendation:
      'El enlace no presenta señales críticas conocidas. Mantén buenas prácticas: verifica siempre el dominio en la barra del navegador.',
    scannedAt: hoursAgo(24),
    source: 'dashboard',
    status: 'completed',
    durationMs: 198,
  },
  {
    id: 'scan_1719247200005_seed05',
    url: 'https://microsoft-verify-account.xyz/login',
    score: 91,
    nivel: 'alto',
    signals: [
      { name: 'SUPLANTACIÓN MARCA', value: 'DETECTADA', nivel: 'alto' },
      { name: 'TLD', value: 'ALTO RIESGO', nivel: 'alto' },
      { name: 'KEYWORDS PHISHING', value: '2 HALLADAS', nivel: 'alto' },
      { name: 'IP EN URL', value: 'NO', nivel: 'bajo' },
      { name: 'URL ACORTADA', value: 'NO', nivel: 'bajo' },
      { name: 'HTTPS', value: 'SÍ', nivel: 'bajo' },
    ],
    recommendation:
      'No abras este enlace. El dominio presenta múltiples señales de phishing. Reporta el mensaje y elimínalo.',
    scannedAt: hoursAgo(48),
    source: 'dashboard',
    status: 'completed',
    durationMs: 334,
  },
  {
    id: 'scan_1719247200006_seed06',
    url: 'https://github.com/visorlink',
    score: 6,
    nivel: 'bajo',
    signals: [
      { name: 'SUPLANTACIÓN MARCA', value: 'NINGUNA', nivel: 'bajo' },
      { name: 'TLD', value: 'NORMAL', nivel: 'bajo' },
      { name: 'KEYWORDS PHISHING', value: 'NINGUNA', nivel: 'bajo' },
      { name: 'IP EN URL', value: 'NO', nivel: 'bajo' },
      { name: 'URL ACORTADA', value: 'NO', nivel: 'bajo' },
      { name: 'HTTPS', value: 'SÍ', nivel: 'bajo' },
    ],
    recommendation:
      'El enlace no presenta señales críticas conocidas. Mantén buenas prácticas: verifica siempre el dominio en la barra del navegador.',
    scannedAt: hoursAgo(72),
    source: 'landing',
    status: 'completed',
    durationMs: 176,
  },
];

export const ENTERPRISE_METRICS: EnterpriseMetrics = {
  activeUsers: 47,
  urlsAnalyzed: 12840,
  highRisksDetected: 342,
  topAttackedDomains: [
    { domain: 'bancolombia', count: 89, trend: 'up' },
    { domain: 'microsoft', count: 67, trend: 'up' },
    { domain: 'paypal', count: 54, trend: 'stable' },
    { domain: 'nequi', count: 41, trend: 'up' },
    { domain: 'davivienda', count: 38, trend: 'down' },
  ],
  scansByDepartment: [
    { department: 'Finanzas', scans: 3240 },
    { department: 'RRHH', scans: 2180 },
    { department: 'TI', scans: 4120 },
    { department: 'Operaciones', scans: 1890 },
    { department: 'Legal', scans: 1410 },
  ],
  weeklyTrend: [
    { week: 'Sem 1', scans: 2100, highRisk: 48 },
    { week: 'Sem 2', scans: 2450, highRisk: 62 },
    { week: 'Sem 3', scans: 2890, highRisk: 71 },
    { week: 'Sem 4', scans: 3120, highRisk: 89 },
  ],
};

export const SIGNAL_DEFINITIONS = [
  {
    name: 'Suplantación de marca',
    description: 'Nombre de banco/empresa en subdominio con dominio diferente al oficial',
    weight: 28,
  },
  {
    name: 'Keywords phishing',
    description: 'login, verify, secure, account, suspend, confirm en la ruta',
    weight: 22,
  },
  {
    name: 'TLD inusual',
    description: '.xyz .top .tk .click .pw — extensiones de alto riesgo estadístico',
    weight: 15,
  },
  {
    name: 'Antigüedad dominio',
    description: 'Dominios creados hace menos de 30 días — señal de campaña nueva',
    weight: 12,
  },
  {
    name: 'Reputación externa',
    description: 'VirusTotal / GSB — actúa como multiplicador ×1.2 si positivo',
    weight: 10,
  },
  {
    name: 'Parámetros rastreo',
    description: 'Tokens únicos en query string sugieren rastreo de víctimas individuales',
    weight: 8,
  },
  {
    name: 'Redirecciones',
    description: 'Cadenas HTTP 301/302 para ocultar el destino final real',
    weight: 5,
  },
];

export const FAQ_ITEMS = [
  {
    q: '¿VisorLink reemplaza mi antivirus?',
    a: 'No. VisorLink es una capa especializada en evaluar URLs antes de abrirlas. Complementa tu stack de seguridad, no lo sustituye.',
  },
  {
    q: '¿De dónde vienen los datos de reputación?',
    a: 'En producción integramos VirusTotal, Google Safe Browsing, WHOIS y reglas propias. Esta demo simula esas fuentes.',
  },
  {
    q: '¿Puedo usar la API en mi empresa?',
    a: 'Sí, el plan Enterprise incluye acceso API REST para integrar escaneos en flujos internos, SIEM o extensiones corporativas.',
  },
  {
    q: '¿Qué pasa con mis URLs escaneadas?',
    a: 'Las URLs se procesan de forma segura. En producción, la retención depende de tu plan y políticas de privacidad configurables.',
  },
];

export const USE_CASES = [
  {
    title: 'Usuario individual',
    desc: 'Verifica links de WhatsApp, email o SMS antes de abrirlos. Resultado claro en segundos.',
    icon: '👤',
  },
  {
    title: 'Pymes y equipos',
    desc: 'Protege empleados no técnicos con historial, alertas y límites por plan.',
    icon: '🏢',
  },
  {
    title: 'Seguridad empresarial',
    desc: 'Dashboard organizacional, API, reportes y visibilidad de campañas dirigidas a tu marca.',
    icon: '🛡️',
  },
];
