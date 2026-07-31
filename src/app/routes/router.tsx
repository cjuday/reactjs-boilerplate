import { createBrowserRouter } from 'react-router-dom';
import { GuestGuard, RequireAuth } from './index';

import LoginPage from '@/features/auth/pages/Login';
import DashboardPage from '@/pages/DashboardPage';

export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);