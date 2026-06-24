import { Outlet } from 'react-router-dom';
import styles from './PublicLayout.module.css';

export function PublicLayout() {
  return (
    <div className={styles.public}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Outlet />
    </div>
  );
}
