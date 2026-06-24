import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useScan } from '@/app/providers/ScanProvider';
import { useAuth } from '@/app/providers/AuthProvider';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { HistoryTable } from '@/components/scan/HistoryTable';
import { RiskBadge } from '@/components/common/RiskBadge';
import { formatNumber } from '@/utils';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { history } = useScan();
  const { user } = useAuth();

  const stats = useMemo(() => {
    const total = history.length;
    const avgRisk = total ? Math.round(history.reduce((s, h) => s + h.score, 0) / total) : 0;
    const critical = history.filter((h) => h.nivel === 'alto').length;
    const dist = {
      bajo: history.filter((h) => h.nivel === 'bajo').length,
      medio: history.filter((h) => h.nivel === 'medio').length,
      alto: critical,
    };
    return { total, avgRisk, critical, dist };
  }, [history]);

  const recommendation = useMemo(() => {
    if (stats.critical > 2) {
      return 'Tu organización detectó múltiples URLs de alto riesgo esta semana. Considera activar alertas automáticas y capacitar al equipo.';
    }
    if (user?.plan === 'free') {
      return 'Estás en el plan Free. Actualiza a Pro para historial extendido, alertas y exportación de reportes.';
    }
    return 'Mantén el hábito de escanear links desconocidos antes de abrirlos. Tu actividad reciente muestra buen uso del sistema.';
  }, [stats.critical, user?.plan]);

  const recent = history.slice(0, 5);
  const maxDist = Math.max(stats.dist.bajo, stats.dist.medio, stats.dist.alto, 1);

  return (
    <div>
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>
          Bienvenido, {user?.name}. Resumen de actividad y riesgo detectado.
        </p>
      </header>

      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <KpiCard label="Total escaneos" value={formatNumber(stats.total)} accent="neon" />
        <KpiCard label="Riesgo promedio" value={stats.avgRisk} sub="/ 100" accent="amber" />
        <KpiCard label="Alertas críticas" value={stats.critical} accent="red" trend={stats.critical > 0 ? 'up' : undefined} />
        <KpiCard label="Plan activo" value={user?.plan?.toUpperCase() ?? 'FREE'} accent="neon" />
      </div>

      <div className={styles.grid}>
        <div className={`card ${styles.block}`}>
          <h3>// distribución por riesgo</h3>
          <div className={styles.distBars}>
            {(['bajo', 'medio', 'alto'] as const).map((level) => (
              <div key={level} className={styles.distRow}>
                <RiskBadge level={level} size="sm" />
                <div className={styles.distTrack}>
                  <div
                    className={`${styles.distFill} ${styles[level]}`}
                    style={{ width: `${(stats.dist[level] / maxDist) * 100}%` }}
                  />
                </div>
                <span>{stats.dist[level]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`card ${styles.block} ${styles.recCard}`}>
          <h3>// recomendación</h3>
          <p>{recommendation}</p>
          {user?.plan === 'free' && (
            <Link to="/app/plans" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Ver planes
            </Link>
          )}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <div className={styles.sectionHead}>
          <h3>Actividad reciente</h3>
          <Link to="/app/history">Ver todo →</Link>
        </div>
        <HistoryTable scans={recent} />
      </div>
    </div>
  );
}
