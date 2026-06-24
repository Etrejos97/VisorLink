import type { ScanSignal } from '@/types';
import { getRiskColor } from '@/utils';
import styles from './SignalGrid.module.css';

interface SignalGridProps {
  signals: ScanSignal[];
}

export function SignalGrid({ signals }: SignalGridProps) {
  return (
    <div className={styles.grid}>
      {signals.map((s) => {
        const color = getRiskColor(s.nivel);
        return (
          <div key={s.name} className={styles.cell}>
            <div className={styles.name}>{s.name}</div>
            <div className={styles.val} style={{ color, textShadow: `0 0 10px ${color}` }}>
              {s.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
