import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { ENTERPRISE_METRICS } from '@/data/mock';
import { EnterpriseMetricsPanel } from '@/components/enterprise/EnterpriseMetricsPanel';
import styles from './EnterprisePage.module.css';

export function EnterprisePage() {
  const { user } = useAuth();
  const [feedbackMsg, setFeedbackMsg] = useState('');

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
        {feedbackMsg && (
          <p
            style={{
              marginBottom: '1rem',
              color: 'var(--neon)',
              fontFamily: 'var(--mono)',
              fontSize: '13px',
              padding: '10px 14px',
              border: '1px solid var(--border2)',
              borderRadius: 'var(--radius)',
              background: 'rgba(0,212,255,0.06)',
            }}
          >
            ✓ {feedbackMsg}
          </p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            setFeedbackMsg('Contacta a ventas@visorlink.io para agendar tu demo Enterprise.')
          }
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
