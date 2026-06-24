import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/app/providers/AuthProvider';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: '◈' },
  { to: '/app/scan', label: 'Escanear', icon: '◎' },
  { to: '/app/history', label: 'Historial', icon: '◫' },
  { to: '/app/plans', label: 'Planes', icon: '◇' },
  { to: '/app/enterprise', label: 'Enterprise', icon: '⬡', enterpriseOnly: true },
  { to: '/app/settings', label: 'Configuración', icon: '⚙' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  const isEnterprise = user?.plan === 'enterprise';
  const { pathname } = useLocation();

  const isItemActive = (to: string): boolean => {
    if (to === '/app/history') return pathname.startsWith('/app/history');
    return pathname === to;
  };

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} aria-hidden />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.brand}>
          <Logo size="sm" />
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.filter((item) => !item.enterpriseOnly || isEnterprise).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.link} ${isItemActive(item.to) ? styles.active : ''}`}
              onClick={onClose}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <span className={styles.planBadge}>{user?.plan?.toUpperCase() ?? 'FREE'}</span>
          <span className={styles.version}>v0.1 demo</span>
        </div>
      </aside>
    </>
  );
}
