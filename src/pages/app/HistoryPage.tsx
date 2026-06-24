import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RiskLevel } from '@/types';
import { useScan } from '@/app/providers/ScanProvider';
import { HistoryTable, HistoryFilters } from '@/components/scan/HistoryTable';
import { EmptyState } from '@/components/common/StateViews';

export function HistoryPage() {
  const { history } = useScan();
  const navigate = useNavigate();
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return history.filter((s) => {
      const matchRisk = riskFilter === 'all' || s.nivel === riskFilter;
      const matchSearch = !search || s.url.toLowerCase().includes(search.toLowerCase());
      return matchRisk && matchSearch;
    });
  }, [history, riskFilter, search]);

  return (
    <div>
      <header className="page-header">
        <h1>Historial de escaneos</h1>
        <p>Consulta análisis previos, filtra por riesgo y revisa el detalle de cada URL.</p>
      </header>

      <HistoryFilters
        riskFilter={riskFilter}
        onRiskChange={setRiskFilter}
        search={search}
        onSearchChange={setSearch}
      />

      {filtered.length > 0 ? (
        <HistoryTable scans={filtered} onViewDetail={(id) => navigate(`/app/history/${id}`)} />
      ) : (
        <EmptyState
          title="Sin resultados"
          description="No hay escaneos que coincidan con los filtros actuales."
          icon="◫"
        />
      )}
    </div>
  );
}
