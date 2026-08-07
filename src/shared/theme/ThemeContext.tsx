import { createContext } from 'react';
import type { ThemeMode } from './theme.types';

export interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);