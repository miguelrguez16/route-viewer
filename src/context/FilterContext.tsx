import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'light' | 'dark';

interface FilterContextType {
    routeNameFilter: string;
    setRouteNameFilter: (filter: string) => void;
    zoomLevel: number;
    setZoomLevel: (zoom: number) => void;
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    selectedRouteId: string | null;
    setSelectedRouteId: (id: string | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: React.ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [routeNameFilter, setRouteNameFilter] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(13);
    const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
    
    // Detect system theme preference
    const [theme, setTheme] = useState<ThemeType>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as ThemeType | null;
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    // Apply theme to document and persist
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const value = React.useMemo(
        () => ({
            zoomLevel,
            setZoomLevel,
            routeNameFilter,
            setRouteNameFilter,
            theme,
            setTheme,
            selectedRouteId,
            setSelectedRouteId,
        }),
        [routeNameFilter, zoomLevel, theme, selectedRouteId]
    );

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};