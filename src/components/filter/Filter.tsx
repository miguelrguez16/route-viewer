import { useFilter } from '../../context/FilterContext';
import { useState, useEffect, type ChangeEvent } from 'react';
import { useDebounce } from '../../hook/useDebounce';


const Filter = () => {
    const { setFilter } = useFilter();
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce the search term with 300ms delay
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Update filter when debounced value changes
    useEffect(() => {
        setFilter(debouncedSearchTerm);
    }, [debouncedSearchTerm, setFilter]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setFilter(searchTerm); // Immediate search when button is clicked
    };

    return (
        <div>
            <input
                type="text"
                onChange={handleInputChange}
                value={searchTerm}
                placeholder={'Search by name, description, or tags...'}
                className="search-input"
            />
            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default Filter;