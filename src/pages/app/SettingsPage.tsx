import { useState } from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { PLANS } from '@/data/mock';
import styles from './SettingsPage.module.css';

export function SettingsPage() {
  const { user, notifications, updateNotifications, logout } = useAuth();
  const [apiMsg, setApiMsg] = useState('');
  const currentPlan = PLANS.find((p) => p.id === user?.plan);

  return (
    <div>
      <header className="page-header">
        <h1>Configuración</h1>
        <p>Gestiona tu perfil, plan y preferencias de notificación.</p>
      </header>

      <div className={styles.grid}>
        <section className={`card ${styles.section}`}>
          <div className={styles.field}>
            <label>Nombre</label>
            <input type="text" value={user?.name ?? ''} readOnly />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" value={user?.email ?? ''} readOnly />
          </div>
          {user?.organizationName && (
            <div className={styles.field}>
              <label>Organización</label>
              <input type="text" value={user.organizationName} readOnly />
            </div>
          )}
        </section>

        <section className={`card ${styles.section}`}>
          <div className={styles.planInfo}>
            <span className={styles.planName}>{currentPlan?.name}</span>
            <span className={styles.planPrice}>
              {currentPlan?.price}
              {currentPlan?.period}
            </span>
          </div>
          <ul className={styles.limits}>
            <li>
              Escaneos/mes:{' '}
              {currentPlan?.limits.scansPerMonth === 'unlimited'
                ? 'Ilimitados'
                : currentPlan?.limits.scansPerMonth}
            </li>
            <li>
              Historial:{' '}
              {currentPlan?.limits.historyDays === 'unlimited'
                ? 'Ilimitado'
                : `${currentPlan?.limits.historyDays} días`}
            </li>
            <li>API: {currentPlan?.limits.apiAccess ? 'Incluida' : 'No disponible'}</li>
          </ul>
        </section>

        <section className={`card ${styles.section}`}>
          {(
            [
              ['emailAlerts', 'Alertas por email'],
              ['criticalOnly', 'Solo alertas críticas'],
              ['weeklyReport', 'Reporte semanal'],
              ['slackIntegration', 'Integración Slack (próximamente)'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className={styles.toggle}>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={(e) => updateNotifications({ [key]: e.target.checked })}
                disabled={key === 'slackIntegration'}
              />
              <span>{label}</span>
            </label>
          ))}
        </section>

        <section className={`card ${styles.section}`}>
          <h3>api (futuro)</h3>
          <p className={styles.apiNote}>
            La integración API REST estará disponible con Supabase + backend Python.
            Endpoint previsto: <code>POST /api/v1/scan</code>
          </p>
          <div className={styles.apiKey}>
            <code>vl_demo_••••••••••••••••</code>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                setApiMsg(
                  'Función disponible en producción. Integración con backend Python en desarrollo.',
                )
              }
            >
              Generar clave
            </button>
          </div>
          {apiMsg && (
            <p
              style={{
                marginTop: '0.75rem',
                color: 'var(--neon)',
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                padding: '8px 12px',
                border: '1px solid var(--border2)',
                borderRadius: 'var(--radius)',
                background: 'rgba(0,212,255,0.06)',
              }}
            >
              ✓ {apiMsg}
            </p>
          )}
        </section>
      </div>

      <button type="button" className={`btn btn-danger ${styles.logout}`} onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}
