'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
  className?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
}

// Popular locations in Malaysia and Indonesia
const POPULAR_LOCATIONS = [
  // Malaysia
  { name: 'Johor Bahru, Malaysia', country: 'Malaysia' },
  { name: 'Kuala Lumpur, Malaysia', country: 'Malaysia' },
  { name: 'Penang, Malaysia', country: 'Malaysia' },
  { name: 'Malacca, Malaysia', country: 'Malaysia' },
  { name: 'Ipoh, Malaysia', country: 'Malaysia' },
  { name: 'Kota Kinabalu, Malaysia', country: 'Malaysia' },
  { name: 'Kuching, Malaysia', country: 'Malaysia' },
  { name: 'Shah Alam, Malaysia', country: 'Malaysia' },
  { name: 'Petaling Jaya, Malaysia', country: 'Malaysia' },
  { name: 'Subang Jaya, Malaysia', country: 'Malaysia' },
  { name: 'Klang, Malaysia', country: 'Malaysia' },
  { name: 'Seremban, Malaysia', country: 'Malaysia' },
  { name: 'Johor, Malaysia', country: 'Malaysia' },
  { name: 'Selangor, Malaysia', country: 'Malaysia' },
  { name: 'Kedah, Malaysia', country: 'Malaysia' },
  { name: 'Perak, Malaysia', country: 'Malaysia' },
  { name: 'Pahang, Malaysia', country: 'Malaysia' },
  { name: 'Terengganu, Malaysia', country: 'Malaysia' },
  { name: 'Kelantan, Malaysia', country: 'Malaysia' },
  { name: 'Negeri Sembilan, Malaysia', country: 'Malaysia' },
  { name: 'Melaka, Malaysia', country: 'Malaysia' },
  { name: 'Putrajaya, Malaysia', country: 'Malaysia' },
  { name: 'Labuan, Malaysia', country: 'Malaysia' },
  { name: 'Sabah, Malaysia', country: 'Malaysia' },
  { name: 'Sarawak, Malaysia', country: 'Malaysia' },
  
  // Indonesia
  { name: 'Jakarta, Indonesia', country: 'Indonesia' },
  { name: 'Surabaya, Indonesia', country: 'Indonesia' },
  { name: 'Bandung, Indonesia', country: 'Indonesia' },
  { name: 'Medan, Indonesia', country: 'Indonesia' },
  { name: 'Semarang, Indonesia', country: 'Indonesia' },
  { name: 'Makassar, Indonesia', country: 'Indonesia' },
  { name: 'Palembang, Indonesia', country: 'Indonesia' },
  { name: 'Batam, Indonesia', country: 'Indonesia' },
  { name: 'Bali, Indonesia', country: 'Indonesia' },
  { name: 'Yogyakarta, Indonesia', country: 'Indonesia' },
  { name: 'Malang, Indonesia', country: 'Indonesia' },
  { name: 'Denpasar, Indonesia', country: 'Indonesia' },
  { name: 'Bogor, Indonesia', country: 'Indonesia' },
  { name: 'Padang, Indonesia', country: 'Indonesia' },
  { name: 'Pekanbaru, Indonesia', country: 'Indonesia' },
  { name: 'Pontianak, Indonesia', country: 'Indonesia' },
  { name: 'Manado, Indonesia', country: 'Indonesia' },
  { name: 'Balikpapan, Indonesia', country: 'Indonesia' },
  { name: 'Banjarmasin, Indonesia', country: 'Indonesia' },
  { name: 'Jambi, Indonesia', country: 'Indonesia' },
];

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter location',
  label,
  error,
  isRequired = false,
  className,
  inputClassName,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<typeof POPULAR_LOCATIONS>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value.length > 0) {
      const query = value.toLowerCase();
      const filtered = POPULAR_LOCATIONS.filter(location =>
        location.name.toLowerCase().includes(query)
      ).slice(0, 8); // Limit to 8 suggestions
      setFilteredLocations(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredLocations([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSelectLocation = (location: string) => {
    onChange(location);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    if (value && filteredLocations.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            {icon}
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={cn(
            'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500',
            'dark:bg-gray-700 dark:text-white dark:border-gray-600',
            'bg-white text-gray-900',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            icon && 'pl-10',
            inputClassName
          )}
        />
        
        {/* Dropdown Suggestions */}
        {isOpen && filteredLocations.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {filteredLocations.map((location, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectLocation(location.name)}
                className={cn(
                  'w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  'flex items-center gap-3',
                  index === 0 && 'rounded-t-md',
                  index === filteredLocations.length - 1 && 'rounded-b-md'
                )}
              >
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {location.name.split(',')[0]}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {location.country}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default LocationInput;

