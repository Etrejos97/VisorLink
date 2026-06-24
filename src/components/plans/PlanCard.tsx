import type { Plan } from '@/types';
import styles from './PlanCard.module.css';

interface PlanCardProps {
  plan: Plan;
  isCurrent?: boolean;
  onSelect?: (planId: Plan['id']) => void;
}

export function PlanCard({ plan, isCurrent, onSelect }: PlanCardProps) {
  return (
    <div className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''} ${isCurrent ? styles.current : ''}`}>
      {plan.highlighted && <span className={styles.badge}>Más popular</span>}
      <h3>{plan.name}</h3>
      <div className={styles.price}>
        <span>{plan.price}</span>
        {plan.period && <small>{plan.period}</small>}
      </div>
      <p className={styles.desc}>{plan.description}</p>
      <ul>
        {plan.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <button
        type="button"
        className={`btn ${isCurrent ? 'btn-ghost' : 'btn-primary'}`}
        onClick={() => onSelect?.(plan.id)}
        disabled={isCurrent}
      >
        {isCurrent ? 'Plan actual' : plan.cta}
      </button>
    </div>
  );
}
