import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchInput({ value = '', onChange, onSearch, suggestions = [], placeholder = 'Search...', className = '' }) {
    const [query, setQuery] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const ref = useRef();

    useEffect(() => setQuery(value), [value]);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleChange = (e) => {
        const v = e.target.value;
        setQuery(v);
        onChange?.(v);
        setShowSuggestions(v.length > 0 && suggestions.length > 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(query);
        setShowSuggestions(false);
    };

    return (
        <form onSubmit={handleSubmit} ref={ref} className={`relative ${className}`}>
            <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => query.length > 0 && suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2.5 input-field text-sm"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(''); onChange?.(''); setShowSuggestions(false); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto"
                    >
                        {suggestions.map((item, i) => (
                            <li
                                key={i}
                                className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={() => {
                                    setQuery(item.label || item);
                                    onChange?.(item.label || item);
                                    onSearch?.(item.label || item);
                                    setShowSuggestions(false);
                                }}
                            >
                                {item.label || item}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </form>
    );
}
