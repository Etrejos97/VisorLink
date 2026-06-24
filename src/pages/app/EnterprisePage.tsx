import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { ENTERPRISE_METRICS } from '@/data/mock';
import { EnterpriseMetricsPanel } from '@/components/enterprise/EnterpriseMetricsPanel';
import styles from './EnterprisePage.module.css';

export function EnterprisePage() {
  const { user } = useAuth();

  if (user?.plan !== 'enterprise') {
    return <Navigate to="/app/plans" replace />;
  }

  return (
    <div>
      <header className="page-header">
        <h1>Vista Enterprise</h1>
        <p>
          {user.organizationName ?? 'Tu organización'} — métricas agregadas y visibilidad operativa.
        </p>
      </header>

      <EnterpriseMetricsPanel metrics={ENTERPRISE_METRICS} />

      <div className={`card ${styles.cta}`}>
        <div>
          <h3>¿Necesitas una implementación a medida?</h3>
          <p>SSO, SLA dedicado, integración SIEM y despliegue on-premise disponibles.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => alert('Contacta a ventas@visorlink.io para agendar tu demo Enterprise.')}
        >
          Solicitar demo empresarial
        </button>
      </div>

      <p className={styles.note}>
        Datos simulados para presentación. En producción conectará multi-tenant Supabase + reportes.
      </p>
    </div>
  );
}

export function EnterpriseUpsell() {
  return (
    <div className={`card ${styles.upsell}`}>
      <h3>Vista Enterprise</h3>
      <p>Dashboard organizacional, multiusuario y API disponibles en plan Enterprise.</p>
      <Link to="/app/plans" className="btn btn-ghost">Ver planes</Link>
    </div>
  );
}
