import type { RiskLevel } from '@/types';
import { RISK_LABELS } from '@/utils';
import styles from './RiskBadge.module.css';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md';
}

export function RiskBadge({ level, size = 'md' }: RiskBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[level]} ${styles[size]}`}>
      ● {RISK_LABELS[level]}
    </span>
  );
}
