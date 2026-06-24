import type { EnterpriseMetrics } from '@/types';
import { formatNumber } from '@/utils';
import { KpiCard } from '@/components/dashboard/KpiCard';
import styles from './EnterpriseMetricsPanel.module.css';

interface EnterpriseMetricsPanelProps {
  metrics: EnterpriseMetrics;
}

export function EnterpriseMetricsPanel({ metrics }: EnterpriseMetricsPanelProps) {
  return (
    <div className={styles.panel}>
      <div className="grid-3">
        <KpiCard label="Usuarios activos" value={metrics.activeUsers} accent="neon" />
        <KpiCard label="URLs analizadas" value={formatNumber(metrics.urlsAnalyzed)} accent="neon" />
        <KpiCard
          label="Riesgos altos detectados"
          value={metrics.highRisksDetected}
          accent="red"
          trend="up"
        />
      </div>

      <div className={styles.grid}>
        <div className={`card ${styles.block}`}>
          <h3>// dominios más atacados</h3>
          <ul className={styles.domainList}>
            {metrics.topAttackedDomains.map((d) => (
              <li key={d.domain}>
                <span className={styles.domain}>{d.domain}</span>
                <span className={styles.count}>{d.count} intentos</span>
                <span className={`${styles.trend} ${styles[d.trend]}`}>
                  {d.trend === 'up' ? '↑' : d.trend === 'down' ? '↓' : '→'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`card ${styles.block}`}>
          <h3>// escaneos por departamento</h3>
          <div className={styles.bars}>
            {metrics.scansByDepartment.map((d) => {
              const max = Math.max(...metrics.scansByDepartment.map((x) => x.scans));
              const pct = (d.scans / max) * 100;
              return (
                <div key={d.department} className={styles.barRow}>
                  <span>{d.department}</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={styles.barVal}>{formatNumber(d.scans)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`card ${styles.block}`}>
        <h3>// tendencia semanal</h3>
        <div className={styles.weekGrid}>
          {metrics.weeklyTrend.map((w) => (
            <div key={w.week} className={styles.weekCol}>
              <div className={styles.weekBars}>
                <div
                  className={styles.weekBarScans}
                  style={{ height: `${(w.scans / 3500) * 100}%` }}
                  title={`${w.scans} escaneos`}
                />
                <div
                  className={styles.weekBarRisk}
                  style={{ height: `${(w.highRisk / 100) * 100}%` }}
                  title={`${w.highRisk} alto riesgo`}
                />
              </div>
              <span>{w.week}</span>
            </div>
          ))}
        </div>
        <div className={styles.legend}>
          <span><i className={styles.legScans} /> Escaneos</span>
          <span><i className={styles.legRisk} /> Alto riesgo</span>
        </div>
      </div>
    </div>
  );
}
