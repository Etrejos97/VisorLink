import { useState } from 'react';
import { QUICK_EXAMPLES } from '@/services/scanService';
import styles from './ScanForm.module.css';

interface ScanFormProps {
  onScan: (url: string) => void;
  isScanning?: boolean;
  compact?: boolean;
}

export function ScanForm({ onScan, isScanning = false, compact = false }: ScanFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isScanning) return;
    onScan(url.trim());
  };

  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ''}`}>
      <form className={styles.inputBox} onSubmit={handleSubmit}>
        <span className={styles.prefix}>// URL</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://pega-aqui-el-link-sospechoso.com"
          autoComplete="off"
          spellCheck={false}
          disabled={isScanning}
        />
        <button type="submit" className={styles.scanBtn} disabled={isScanning}>
          {isScanning ? '...' : 'ESCANEAR'}
        </button>
      </form>
      {!compact && (
        <div className={styles.examples}>
          {QUICK_EXAMPLES.map((ex) => (
            <button
              key={ex.url}
              type="button"
              className={styles.pill}
              onClick={() => setUrl(ex.url)}
              disabled={isScanning}
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
