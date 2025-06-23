import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    routeNameFilter: string;
    setRouteNameFilter: (filter: string) => void;
    zoomLevel: number;
    setZoomLevel: (zoom: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: React.ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [routeNameFilter, setRouteNameFilter] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(13); // Example zoom level state

    const value = React.useMemo(
        () => ({
            zoomLevel,
            setZoomLevel,
            routeNameFilter,
            setRouteNameFilter,
        }),
        [routeNameFilter,zoomLevel]
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