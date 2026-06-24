import { Link } from 'react-router-dom';
import type { ScanResult, RiskLevel } from '@/types';
import { formatDate } from '@/utils';
import { RiskBadge } from '@/components/common/RiskBadge';
import styles from './HistoryTable.module.css';

interface HistoryTableProps {
  scans: ScanResult[];
  onViewDetail?: (id: string) => void;
}

const SOURCE_LABELS: Record<ScanResult['source'], string> = {
  landing: 'Landing',
  dashboard: 'Dashboard',
  api: 'API',
  extension: 'Extensión',
};

export function HistoryTable({ scans, onViewDetail }: HistoryTableProps) {
  if (scans.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>URL</th>
            <th>Fecha</th>
            <th>Riesgo</th>
            <th>Fuente</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan) => (
            <tr key={scan.id}>
              <td className={styles.url} title={scan.url}>
                {scan.url}
              </td>
              <td>{formatDate(scan.scannedAt)}</td>
              <td>
                <RiskBadge level={scan.nivel} size="sm" />
              </td>
              <td>
                <span className={styles.source}>{SOURCE_LABELS[scan.source]}</span>
              </td>
              <td>
                <span className={`${styles.status} ${styles[scan.status]}`}>
                  {scan.status === 'completed' ? 'Completado' : 'Fallido'}
                </span>
              </td>
              <td>
                {onViewDetail ? (
                  <button type="button" className={styles.action} onClick={() => onViewDetail(scan.id)}>
                    Ver detalle
                  </button>
                ) : (
                  <Link to={`/app/history/${scan.id}`} className={styles.action}>
                    Ver detalle
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HistoryFilters({
  riskFilter,
  onRiskChange,
  search,
  onSearchChange,
}: {
  riskFilter: RiskLevel | 'all';
  onRiskChange: (v: RiskLevel | 'all') => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className={styles.filters}>
      <input
        type="search"
        placeholder="Buscar URL..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.search}
      />
      <select value={riskFilter} onChange={(e) => onRiskChange(e.target.value as RiskLevel | 'all')}>
        <option value="all">Todos los riesgos</option>
        <option value="alto">Alto</option>
        <option value="medio">Medio</option>
        <option value="bajo">Bajo</option>
      </select>
    </div>
  );
}
