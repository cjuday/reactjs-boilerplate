import { createBrowserRouter } from 'react-router-dom';
import { GuestGuard, RequireAuth } from './index';
import AppLayout from '@/layouts/AppLayout';
import Login from '@/features/auth/pages/Login';
import Dashboard from '@/pages/Dashboard';
import RegisterPage from '@/features/auth/pages/Register';

export const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      }
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