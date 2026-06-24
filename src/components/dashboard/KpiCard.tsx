import styles from './KpiCard.module.css';

interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: 'neon' | 'red' | 'amber' | 'green';
}

export function KpiCard({ label, value, sub, trend, accent = 'neon' }: KpiCardProps) {
  return (
    <div className={`${styles.card} card`}>
      <span className={styles.label}>{label}</span>
      <div className={`${styles.value} ${styles[accent]}`}>{value}</div>
      {sub && <span className={styles.sub}>{sub}</span>}
      {trend && trend !== 'neutral' && (
        <span className={`${styles.trend} ${styles[trend]}`}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      )}
    </div>
  );
}
