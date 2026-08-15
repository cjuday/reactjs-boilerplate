import { createBrowserRouter } from 'react-router-dom';
import { GuestGuard, RequireAuth } from './index';
import AppLayout from '@/layouts/AppLayout';
import Login from '@/features/auth/pages/Login';
import Dashboard from '@/pages/Dashboard';
import RegisterPage from '@/features/auth/pages/Register';
import VerifyEmailPage from '@/features/auth/pages/VerifyEmail';
import ForgotPassword from '@/features/auth/pages/ForgotPassword';
import ResetPassword from '@/features/auth/pages/ResetPassword';
import ProfilePage from '@/features/profile/pages/Profile';
import SecurityPage from '@/features/security/pages/Security';
import NotFoundPage from '@/pages/NotFoundPage';
import ForbiddenPage from '@/pages/ForbiddenPage';
import ServerErrorPage from '@/pages/ServerErrorPage';
import UserList from '@/features/users/pages/UserList';
import UserEdit from '@/features/users/pages/UserEdit';

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
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '/500',
    element: <ServerErrorPage />,
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
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/settings/security',
            element: <SecurityPage />,
          },
          {
            path: '/users',
            element: <UserList />,
          },
          {
              path: '/users/:id/edit',
              element: <UserEdit />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);