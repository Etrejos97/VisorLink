import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/app/layouts/PublicLayout';
import { AppLayout } from '@/app/layouts/AppLayout';
import { LandingPage } from '@/pages/public/LandingPage';
import { LoginPage, RegisterPage } from '@/pages/public/AuthPages';
import { DashboardPage } from '@/pages/app/DashboardPage';
import { ScanPage } from '@/pages/app/ScanPage';
import { HistoryPage } from '@/pages/app/HistoryPage';
import { HistoryDetailPage } from '@/pages/app/HistoryDetailPage';
import { PlansPage } from '@/pages/app/PlansPage';
import { EnterprisePage } from '@/pages/app/EnterprisePage';
import { SettingsPage } from '@/pages/app/SettingsPage';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'scan', element: <ScanPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'history/:id', element: <HistoryDetailPage /> },
      { path: 'plans', element: <PlansPage /> },
      { path: 'enterprise', element: <EnterprisePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
