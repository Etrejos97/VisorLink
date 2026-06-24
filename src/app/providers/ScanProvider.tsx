import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ScanResult } from '@/types';
import { INITIAL_SCAN_HISTORY } from '@/data/mock';
import { buildScanResult, SCAN_LOADING_STEPS } from '@/services/scanService';
import { sleep } from '@/utils';

interface ScanContextValue {
  history: ScanResult[];
  currentScan: ScanResult | null;
  isScanning: boolean;
  loadingStep: number;
  loadingSteps: string[];
  runScan: (url: string, source?: ScanResult['source']) => Promise<ScanResult | null>;
  getScanById: (id: string) => ScanResult | undefined;
  clearCurrentScan: () => void;
}

const ScanContext = createContext<ScanContextValue | null>(null);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ScanResult[]>(INITIAL_SCAN_HISTORY);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loadingStep, setLoadingStep] = useState(-1);

  const runScan = useCallback(async (url: string, source: ScanResult['source'] = 'dashboard') => {
    const trimmed = url.trim();
    if (!trimmed) return null;

    setIsScanning(true);
    setCurrentScan(null);
    setLoadingStep(0);

    for (let i = 0; i < SCAN_LOADING_STEPS.length; i++) {
      setLoadingStep(i);
      await sleep(560 + i * 130);
    }
    await sleep(280);

    const result = buildScanResult(trimmed, source);
    setHistory((prev) => [result, ...prev]);
    setCurrentScan(result);
    setIsScanning(false);
    setLoadingStep(-1);
    return result;
  }, []);

  const getScanById = useCallback((id: string) => history.find((s) => s.id === id), [history]);

  const clearCurrentScan = useCallback(() => setCurrentScan(null), []);

  const value = useMemo(
    () => ({
      history,
      currentScan,
      isScanning,
      loadingStep,
      loadingSteps: SCAN_LOADING_STEPS,
      runScan,
      getScanById,
      clearCurrentScan,
    }),
    [history, currentScan, isScanning, loadingStep, runScan, getScanById, clearCurrentScan],
  );

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
}

export function useScan() {
  const ctx = useContext(ScanContext);
  if (!ctx) throw new Error('useScan must be used within ScanProvider');
  return ctx;
}

// Future: replace with API client to Python backend
export const scanApiPlaceholder = {
  endpoint: '/api/v1/scan',
  ready: false,
};
