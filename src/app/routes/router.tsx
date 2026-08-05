import { createBrowserRouter } from 'react-router-dom';
import { GuestGuard, RequireAuth } from './index';
import AppLayout from '@/layouts/AppLayout';
import Login from '@/features/auth/pages/Login';
import Dashboard from '@/pages/Dashboard';
import RegisterPage from '@/features/auth/pages/Register';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmail';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import ResetPassword from '@/features/auth/pages/ResetPassword';

export const router = createBrowserRouter([
  {
    path: '/auth/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/auth/reset-password',
    element: <ResetPassword />,
  },
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
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword/>
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