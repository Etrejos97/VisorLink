import { AuthProvider } from './AuthProvider';
import { ScanProvider } from './ScanProvider';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ScanProvider>{children}</ScanProvider>
    </AuthProvider>
  );
}
