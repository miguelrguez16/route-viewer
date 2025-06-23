import { useFilter } from '../../context/FilterContext';
import { useState, useEffect, type ChangeEvent } from 'react';
import { useDebounce } from '../../hook/useDebounce';


const Filter = () => {
    const { setRouteNameFilter } = useFilter();
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce the search term with 300ms delay
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Update filter when debounced value changes
    useEffect(() => {
        setRouteNameFilter(debouncedSearchTerm);
    }, [debouncedSearchTerm, setRouteNameFilter]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setRouteNameFilter(searchTerm); // Immediate search when button is clicked
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="search" className="sr-only">
                Search Route:
            </label>
            <input
                type="text"
                onChange={handleInputChange}
                value={searchTerm}
                placeholder={'Search by name, description, or tags...'}
                className="search-input"
            />
            <button
                onClick={handleSearch}
                className="search-button"
                title="Search"
            >
                Search
            </button>
            <input
                type="reset"
                onClick={() => setSearchTerm('')}
                className="search-reset"
                title="Clear Search"
            />
    
        </div>
    );
};

export default Filter;