import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import styles from './Topbar.module.css';

interface TopbarProps {
  onMenuClick: () => void;
  title?: string;
}

export function Topbar({ onMenuClick, title }: TopbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button type="button" className={styles.menuBtn} onClick={onMenuClick} aria-label="Menú">
          ☰
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>

      <div className={styles.right}>
        <Link to="/app/scan" className={`btn btn-primary ${styles.scanQuick}`}>
          + Escanear
        </Link>
        <div className={styles.user}>
          <div className={styles.avatar}>{user?.avatarInitials}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userPlan}>{user?.plan?.toUpperCase()}</span>
          </div>
        </div>
        <button type="button" className={styles.logout} onClick={logout} title="Cerrar sesión">
          ⏻
        </button>
      </div>
    </header>
  );
}
