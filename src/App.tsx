import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/routes/router';
import { Toaster } from 'sonner';
import AuthInitializer from './features/auth/components/AuthInitializer';

export default function App() {
  return(
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  )
  
}