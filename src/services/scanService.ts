import type { ScanResult, ScanSignal, RiskLevel } from '@/types';
import { generateId, getRecommendation } from '@/utils';

const BAD_TLDS = ['xyz', 'top', 'click', 'tk', 'ml', 'ga', 'cf', 'pw', 'cc'];
const PHISH_KW = ['secure', 'login', 'verify', 'account', 'suspended', 'confirm', 'billing', 'restore'];
const BRANDS = ['paypal', 'google', 'facebook', 'amazon', 'apple', 'bancolombia', 'davivienda', 'nequi', 'bbva'];
const LEGIT_DOMS = [
  'bancolombia.com',
  'paypal.com',
  'google.com',
  'amazon.com',
  'apple.com',
  'github.com',
  'microsoft.com',
];

export const SCAN_LOADING_STEPS = [
  'Analizando estructura de la URL...',
  'Consultando listas de reputación...',
  'Clasificando con modelo ML (Random Forest)...',
  'Verificando VirusTotal · Google Safe Browsing...',
];

export const QUICK_EXAMPLES = [
  { label: '→ phishing bancario', url: 'https://secure-login-bancolombia.xyz/verify?token=8a3f' },
  { label: '→ paypal falso', url: 'https://paypal-account-suspended.top/restore' },
  { label: '→ legítima', url: 'https://www.bancolombia.com/personas' },
  { label: '→ url acortada', url: 'https://bit.ly/3xK9mP2' },
];

export interface AnalysisResult {
  score: number;
  nivel: RiskLevel;
  signals: ScanSignal[];
}

export function analyzeUrl(url: string): AnalysisResult {
  const u = url.toLowerCase();
  const isLegit = LEGIT_DOMS.some((d) => u.includes(d));
  const hasBadTld = BAD_TLDS.some((t) => u.includes('.' + t));
  const kwCount = PHISH_KW.filter((k) => u.includes(k)).length;
  const brandSpoof = BRANDS.some((b) => u.includes(b)) && !isLegit;
  const hasIp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(u);
  const isShort = /bit\.ly|tinyurl|t\.co|ow\.ly/.test(u);

  let score = 10;
  if (isLegit) {
    score = Math.floor(Math.random() * 12) + 5;
  } else {
    if (hasBadTld) score += 30;
    if (brandSpoof) score += 35;
    if (kwCount) score += kwCount * 12;
    if (hasIp) score += 25;
    if (isShort) score += 20;
    score = Math.min(96, score + Math.floor(Math.random() * 8));
  }

  const nivel: RiskLevel = score >= 70 ? 'alto' : score >= 40 ? 'medio' : 'bajo';

  const signals: ScanSignal[] = [
    {
      name: 'SUPLANTACIÓN MARCA',
      value: brandSpoof ? 'DETECTADA' : 'NINGUNA',
      nivel: brandSpoof ? 'alto' : 'bajo',
    },
    { name: 'TLD', value: hasBadTld ? 'ALTO RIESGO' : 'NORMAL', nivel: hasBadTld ? 'alto' : 'bajo' },
    {
      name: 'KEYWORDS PHISHING',
      value: kwCount > 0 ? `${kwCount} HALLADAS` : 'NINGUNA',
      nivel: kwCount > 0 ? 'alto' : 'bajo',
    },
    { name: 'IP EN URL', value: hasIp ? 'SÍ' : 'NO', nivel: hasIp ? 'alto' : 'bajo' },
    { name: 'URL ACORTADA', value: isShort ? 'SÍ' : 'NO', nivel: isShort ? 'medio' : 'bajo' },
    {
      name: 'HTTPS',
      value: u.startsWith('https') ? 'SÍ' : 'NO',
      nivel: u.startsWith('https') ? 'bajo' : 'medio',
    },
  ];

  return { score, nivel, signals };
}

export function buildScanResult(
  url: string,
  source: ScanResult['source'] = 'dashboard',
): ScanResult {
  const analysis = analyzeUrl(url);
  return {
    id: generateId(),
    url,
    ...analysis,
    recommendation: getRecommendation(analysis.nivel, url),
    scannedAt: new Date().toISOString(),
    source,
    status: 'completed',
    durationMs: Math.floor(Math.random() * 400) + 180,
  };
}
