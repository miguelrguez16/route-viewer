import React from 'react';
import { useFilter } from '../../context/FilterContext';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useFilter();

    return (
        <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <span className="theme-icon">🌙</span>
            ) : (
                <span className="theme-icon">☀️</span>
            )}
        </button>
    );
};
