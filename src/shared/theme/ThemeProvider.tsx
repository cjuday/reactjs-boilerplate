import { useEffect, useMemo, useState } from 'react';

import { ThemeContext } from './ThemeContext';
import type { ThemeMode } from './theme.types';

interface Props {
    children: React.ReactNode;
}

const STORAGE_KEY = 'theme';

export default function ThemeProvider({ children }: Props) {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (
            saved === 'light' ||
            saved === 'dark' ||
            saved === 'system'
        ) {
            return saved;
        }

        return 'system';
    });

    useEffect(() => {
        const root = document.documentElement;

        const mediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );

        const applyTheme = () => {
            const isDark =
                theme === 'dark' ||
                (theme === 'system' && mediaQuery.matches);

            root.classList.toggle('dark', isDark);
        };

        // Apply immediately
        applyTheme();

        // Persist selection
        localStorage.setItem(STORAGE_KEY, theme);

        // Debug
        console.log('Theme:', theme);
        console.log('HTML class:', root.className);

        if (theme !== 'system') {
            return;
        }

        const handleSystemThemeChange = () => {
            applyTheme();
        };

        mediaQuery.addEventListener(
            'change',
            handleSystemThemeChange,
        );

        return () => {
            mediaQuery.removeEventListener(
                'change',
                handleSystemThemeChange,
            );
        };
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}