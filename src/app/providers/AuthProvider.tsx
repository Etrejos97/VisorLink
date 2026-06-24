import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { NotificationSettings, PlanId, User } from '@/types';
import { DEMO_USERS } from '@/data/mock';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  notifications: NotificationSettings;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginDemo: (email: string) => void;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updatePlan: (plan: PlanId) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
}

const defaultNotifications: NotificationSettings = {
  emailAlerts: true,
  criticalOnly: false,
  weeklyReport: true,
  slackIntegration: false,
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);

  const login = useCallback(async (email: string, password: string) => {
    const demo = DEMO_USERS[email.toLowerCase()];
    if (demo && demo.password === password) {
      setUser(demo.user);
      return { ok: true };
    }
    if (password.length >= 6) {
      setUser({
        id: `usr_${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split('@')[0],
        role: 'individual',
        plan: 'free',
        avatarInitials: email.slice(0, 2).toUpperCase(),
      });
      return { ok: true };
    }
    return { ok: false, error: 'Credenciales inválidas. Usa demo123 o contraseña de 6+ caracteres.' };
  }, []);

  const loginDemo = useCallback((email: string) => {
    const demo = DEMO_USERS[email.toLowerCase()];
    if (demo) setUser(demo.user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    if (!name || !email || password.length < 6) {
      return { ok: false, error: 'Completa todos los campos. Contraseña mínimo 6 caracteres.' };
    }
    setUser({
      id: `usr_${Date.now()}`,
      email: email.toLowerCase(),
      name,
      role: 'individual',
      plan: 'free',
      avatarInitials: name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    });
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updatePlan = useCallback((plan: PlanId) => {
    setUser((prev) => (prev ? { ...prev, plan, role: plan === 'enterprise' ? 'enterprise_admin' : plan === 'pro' ? 'pro' : 'individual' } : null));
  }, []);

  const updateNotifications = useCallback((settings: Partial<NotificationSettings>) => {
    setNotifications((prev) => ({ ...prev, ...settings }));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      notifications,
      login,
      loginDemo,
      register,
      logout,
      updatePlan,
      updateNotifications,
    }),
    [user, notifications, login, loginDemo, register, logout, updatePlan, updateNotifications],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Future: replace with Supabase auth client
export const authServicePlaceholder = {
  provider: 'supabase' as const,
  ready: false,
};
