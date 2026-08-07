import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/App';
import { store } from '@/app/store';
import AuthBootstrap from '@/app/AuthBootstrap';
import ThemeProvider from '@/shared/theme/ThemeProvider';
import '@/styles/globals.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <AuthBootstrap>
                    <App />
                </AuthBootstrap>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);