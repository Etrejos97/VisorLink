import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { Sidebar } from '@/components/common/Sidebar';
import { Topbar } from '@/components/common/Topbar';
import styles from './AppLayout.module.css';

export function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.shell}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={styles.main}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
