import styles from './StateViews.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: string;
}

export function EmptyState({ title, description, action, icon = '◇' }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon}>{icon}</span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

export function LoadingState({ message = 'Cargando...' }: { message?: string }) {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <span>{message}</span>
    </div>
  );
}

export function ErrorState({ title, description, onRetry }: { title: string; description?: string; onRetry?: () => void }) {
  return (
    <div className={styles.error}>
      <span className={styles.icon}>!</span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {onRetry && (
        <button type="button" className="btn btn-ghost" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
