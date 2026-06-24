import { Link, useParams } from 'react-router-dom';
import { useScan } from '@/app/providers/ScanProvider';
import { ScanResultCard } from '@/components/scan/ScanResultCard';
import { EmptyState } from '@/components/common/StateViews';
import { formatDate } from '@/utils';
import styles from './HistoryDetailPage.module.css';

export function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getScanById } = useScan();
  const scan = id ? getScanById(id) : undefined;

  if (!scan) {
    return (
      <div>
        <Link to="/app/history" className={styles.back}>← Volver al historial</Link>
        <EmptyState title="Escaneo no encontrado" description="El análisis solicitado no existe en esta sesión demo." />
      </div>
    );
  }

  return (
    <div>
      <Link to="/app/history" className={styles.back}>← Volver al historial</Link>
      <header className="page-header">
        <h1>Detalle del escaneo</h1>
        <p>
          {formatDate(scan.scannedAt)} · {scan.durationMs}ms · Fuente: {scan.source}
        </p>
      </header>
      <ScanResultCard result={scan} />
    </div>
  );
}
