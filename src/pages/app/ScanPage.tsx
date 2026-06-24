import { useEffect } from 'react';
import { useScan } from '@/app/providers/ScanProvider';
import { ScanForm } from '@/components/scan/ScanForm';
import { ScanLoading } from '@/components/scan/ScanLoading';
import { ScanResultCard } from '@/components/scan/ScanResultCard';
import styles from './ScanPage.module.css';

export function ScanPage() {
  const { isScanning, loadingStep, loadingSteps, currentScan, runScan, clearCurrentScan } = useScan();

  useEffect(() => {
    clearCurrentScan();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <header className="page-header">
        <h1>Centro de escaneo</h1>
        <p>Analiza URLs sospechosas y obtén un informe de riesgo explicable.</p>
      </header>

      <div className={styles.scanArea}>
        <ScanForm onScan={(url) => runScan(url, 'dashboard')} isScanning={isScanning} compact />

        {isScanning && (
          <ScanLoading steps={loadingSteps} activeStep={loadingStep} />
        )}

        {currentScan && !isScanning && (
          <ScanResultCard result={currentScan} />
        )}

        {!currentScan && !isScanning && (
          <div className={`card ${styles.hint}`}>
            <span>// motor demo</span>
            <p>
              El análisis simula reglas de phishing, TLDs de riesgo, suplantación de marca y
              reputación externa. En producción se conectará al motor Python + VirusTotal + GSB.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
