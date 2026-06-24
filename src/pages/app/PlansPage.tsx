import { useAuth } from '@/app/providers/AuthProvider';
import { PLANS } from '@/data/mock';
import { PlanCard } from '@/components/plans/PlanCard';
import type { PlanId } from '@/types';

export function PlansPage() {
  const { user, updatePlan } = useAuth();

  const handleSelect = (planId: PlanId) => {
    if (planId === 'enterprise') {
      alert('Contacto comercial: ventas@visorlink.io — Demo empresarial disponible.');
      return;
    }
    updatePlan(planId);
  };

  return (
    <div>
      <header className="page-header">
        <h1>Planes</h1>
        <p>
          Plan actual: <strong>{user?.plan?.toUpperCase()}</strong>. Escala según el volumen y
          las necesidades de tu equipo.
        </p>
      </header>

      <div className="grid-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrent={user?.plan === plan.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
