import styles from './ScanLoading.module.css';

interface ScanLoadingProps {
  steps: string[];
  activeStep: number;
}

export function ScanLoading({ steps, activeStep }: ScanLoadingProps) {
  return (
    <div className={styles.loading}>
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isDone = i < activeStep;
        return (
          <div
            key={step}
            className={`${styles.line} ${isActive ? styles.active : ''} ${isDone ? styles.done : ''}`}
          >
            <div className={styles.icon}>
              {isDone ? (
                <span className={styles.check}>✓</span>
              ) : isActive ? (
                <div className={styles.spinner} />
              ) : (
                <span className={styles.pending}>_</span>
              )}
            </div>
            <span>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
