import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    filter: string;
    setFilter: (filter: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
    children: React.ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [filter, setFilter] = useState<string>('');

    const value = React.useMemo(
        () => ({
            filter,
            setFilter,
        }),
        [filter]
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