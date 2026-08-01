import { createBrowserRouter } from 'react-router-dom';
import { GuestGuard, RequireAuth } from './index';
import AppLayout from '@/layouts/AppLayout';
import Login from '@/features/auth/pages/Login';
import Dashboard from '@/pages/Dashboard';

export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);