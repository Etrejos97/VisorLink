import type { RiskLevel } from '@/types';

export const RISK_LABELS: Record<RiskLevel, string> = {
  bajo: 'BAJO',
  medio: 'MEDIO',
  alto: 'ALTO',
};

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export function formatNumber(n: number): string {
  return n.toLocaleString('es-CO');
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(): string {
  return `scan_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getRiskColor(level: RiskLevel): string {
  if (level === 'alto') return 'var(--red)';
  if (level === 'medio') return 'var(--amber)';
  return 'var(--green)';
}

export function getRecommendation(level: RiskLevel, url: string): string {
  if (level === 'alto') {
    return `No abras este enlace. El dominio "${url}" presenta múltiples señales de phishing. Reporta el mensaje y elimínalo.`;
  }
  if (level === 'medio') {
    return 'Precaución: hay señales sospechosas. Verifica el remitente por un canal oficial antes de ingresar credenciales.';
  }
  return 'El enlace no presenta señales críticas conocidas. Mantén buenas prácticas: verifica siempre el dominio en la barra del navegador.';
}
