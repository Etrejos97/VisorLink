export type RiskLevel = 'bajo' | 'medio' | 'alto';
export type PlanId = 'free' | 'pro' | 'enterprise';
export type UserRole = 'individual' | 'pro' | 'enterprise_admin';

export interface ScanSignal {
  name: string;
  value: string;
  nivel: RiskLevel;
}

export interface ScanResult {
  id: string;
  url: string;
  score: number;
  nivel: RiskLevel;
  signals: ScanSignal[];
  recommendation: string;
  scannedAt: string;
  source: 'landing' | 'dashboard' | 'api' | 'extension';
  status: 'completed' | 'failed';
  durationMs: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanId;
  organizationId?: string;
  organizationName?: string;
  avatarInitials: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limits: {
    scansPerMonth: number | 'unlimited';
    historyDays: number | 'unlimited';
    users: number | 'unlimited';
    apiAccess: boolean;
    alerts: boolean;
    export: boolean;
  };
  highlighted?: boolean;
  cta: string;
}

export interface DashboardStats {
  totalScans: number;
  avgRiskScore: number;
  criticalAlerts: number;
  riskDistribution: { bajo: number; medio: number; alto: number };
}

export interface EnterpriseMetrics {
  activeUsers: number;
  urlsAnalyzed: number;
  highRisksDetected: number;
  topAttackedDomains: { domain: string; count: number; trend: 'up' | 'down' | 'stable' }[];
  scansByDepartment: { department: string; scans: number }[];
  weeklyTrend: { week: string; scans: number; highRisk: number }[];
}

export interface NotificationSettings {
  emailAlerts: boolean;
  criticalOnly: boolean;
  weeklyReport: boolean;
  slackIntegration: boolean;
}
