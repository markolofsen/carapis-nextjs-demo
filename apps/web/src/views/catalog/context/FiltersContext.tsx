import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FilterState } from '../types';

interface FiltersContextType {
  filters: FilterState;
  activeFiltersCount: number;
  activeFilters: Array<{ key: string; value: string; label: string }>;
  handleImmediateFilterChange: (field: keyof FilterState, value: string) => void;
  handleDebouncedFilterChange: (field: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  removeFilter: (key: string) => void;
  getFilterLabel: (key: string, value: string) => string;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

interface FiltersProviderProps {
  children: React.ReactNode;
}

const defaultFilters: FilterState = {
  search: '',
  fuel_type: '',
  transmission: '',
  year_min: '',
  year_max: '',
  price_min: '',
  price_max: '',
  mileage_max: '',
  investment_grade: '',
  risk_level: '',
  is_verified: '',
  ordering: '-created_at',
  color: '',
  location: '',
  accident_count: '',
  owner_changes: '',
  vehicle_model_slug: '',
};
export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Sync filters with URL query
  useEffect(() => {
    setFilters({
      search: (router.query.search as string) || '',
      fuel_type: (router.query.fuel_type as string) || '',
      transmission: (router.query.transmission as string) || '',
      year_min: (router.query.year_min as string) || '',
      year_max: (router.query.year_max as string) || '',
      price_min: (router.query.price_min as string) || '',
      price_max: (router.query.price_max as string) || '',
      mileage_max: (router.query.mileage_max as string) || '',
      investment_grade: (router.query.investment_grade as string) || '',
      risk_level: (router.query.risk_level as string) || '',
      is_verified: (router.query.is_verified as string) || '',
      ordering: (router.query.ordering as string) || '-created_at',
      color: (router.query.color as string) || '',
      location: (router.query.location as string) || '',
      accident_count: (router.query.accident_count as string) || '',
      owner_changes: (router.query.owner_changes as string) || '',
      vehicle_model_slug: (router.query.vehicle_model_slug as string) || '',
    });
  }, [router.query]);

  const applyFilters = (newFilters: FilterState) => {
    const query = { ...router.query, ...newFilters };

    // Remove empty values
    Object.keys(query).forEach((key) => {
      if (query[key as keyof typeof query] === '') {
        delete query[key as keyof typeof query];
      }
    });

    router.push({
      pathname: router.pathname,
      query: { ...query, page: 1 }, // Reset to first page
    });
  };

  const handleImmediateFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value as FilterState[keyof FilterState] };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleDebouncedFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value as FilterState[keyof FilterState] };
    setFilters(newFilters);

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      applyFilters(newFilters);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    router.push({
      pathname: router.pathname,
      query: { page: 1 },
    });
  };

  const removeFilter = (key: string) => {
    const newQuery = { ...router.query };
    delete newQuery[key];
    router.push({
      pathname: router.pathname,
      query: { ...newQuery, page: 1 },
    });
  };

  const getFilterLabel = (key: string, value: string): string => {
    switch (key) {
      case 'search':
        return `Search: "${value}"`;
      case 'body_type':
        return `Body: ${value}`;
      case 'fuel_type':
        return `Fuel: ${value}`;
      case 'transmission':
        return `Transmission: ${value}`;
      case 'year_min':
        return `Year: from ${value}`;
      case 'year_max':
        return `Year: to ${value}`;
      case 'price_min':
        return `Price: from ${value}만원`;
      case 'price_max':
        return `Price: to ${value}만원`;
      case 'mileage_max':
        return `Max Mileage: ${value}km`;
      case 'investment_grade':
        return `Grade: ${value}`;
      case 'risk_level':
        return `Risk: ${value}`;
      case 'status':
        return `Status: ${value}`;
      case 'is_verified':
        return value === 'true' ? 'Verified Only' : 'Not Verified';
      case 'ordering':
        return `Sort: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };

  // Calculate active filters
  const activeFilters = Object.entries(router.query)
    .filter(([key, value]) => {
      return key !== 'page' && key !== 'limit' && value !== '' && value !== undefined && value !== null;
    })
    .map(([key, value]) => ({
      key,
      value: value as string,
      label: getFilterLabel(key, value as string),
    }));

  const activeFiltersCount = Object.values(filters).filter((v) => v !== '' && v !== '-created_at').length;

  const value: FiltersContextType = {
    filters,
    activeFiltersCount,
    activeFilters,
    handleImmediateFilterChange,
    handleDebouncedFilterChange,
    clearFilters,
    removeFilter,
    getFilterLabel,
  };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
