import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css';
import App from '@/App.tsx'
import { store } from '@/app/store.ts';
import { Provider } from 'react-redux';
import AuthBootstrap from './app/AuthBootstrap';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthBootstrap>
        <App />
      </AuthBootstrap>
    </Provider>
  </StrictMode>,
)
