import { dataEncarApiVehiclesList } from '@/api';
import type { CatalogFilter, VehicleListItem } from '@/api/types';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface CatalogContextType {
  vehicles: VehicleListItem[];
  totalCount: number;
  currentPage: number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

interface CatalogProviderProps {
  children: ReactNode;
  initialVehicles: VehicleListItem[];
  initialTotalCount: number;
  initialPage: number;
}

export const CatalogProvider: React.FC<CatalogProviderProps> = ({ children, initialVehicles, initialTotalCount, initialPage }) => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<VehicleListItem[]>(initialVehicles);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Extract filter parameters from router query
      const {
        page = 1,
        page_size = 20,
        search,
        fuel_type,
        transmission,
        year_min,
        year_max,
        price_min,
        price_max,
        mileage_max,
        investment_grade,
        risk_level,
        is_verified,
        ordering = '-created_at',
        brand_slug,
        model_group_slug,
        color,
        location,
        accident_count,
        owner_changes,
        vehicle_model_slug,
      } = router.query;

      const payload: CatalogFilter = {
        page: parseInt(page as string),
        page_size: parseInt(page_size as string) || 20,
        ordering: ordering as string,
        brand_slug: brand_slug as string,
        model_group_slug: model_group_slug as string,
        search: search as string,
        fuel_type: fuel_type as any,
        transmission: transmission as any,
        year_min: year_min ? parseInt(year_min as string) : undefined,
        year_max: year_max ? parseInt(year_max as string) : undefined,
        price_min: price_min ? parseInt(price_min as string) : undefined,
        price_max: price_max ? parseInt(price_max as string) : undefined,
        mileage_max: mileage_max ? parseInt(mileage_max as string) : undefined,
        investment_grade: investment_grade as any,
        risk_level: risk_level as any,
        is_verified: is_verified === 'true' ? true : is_verified === 'false' ? false : undefined,
        color: color as any,
        location: location as any,
        accident_count: accident_count ? parseInt(accident_count as string) : undefined,
        owner_changes: owner_changes ? parseInt(owner_changes as string) : undefined,
        vehicle_model_slug: vehicle_model_slug as any,
      };

      const response = await dataEncarApiVehiclesList(payload);

      if (response?.data) {
        setVehicles(response.data.results || []);
        setTotalCount(response.data.count || 0);
        // Calculate current page from URL since web API doesn't return page number
        const urlPage = parseInt(router.query.page as string) || 1;
        setCurrentPage(urlPage);
      }
    } catch (error) {
      console.error('Error refreshing catalog data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data when router query changes
  useEffect(() => {
    refreshData();
  }, [router.query]);

  const value: CatalogContextType = {
    vehicles,
    totalCount,
    currentPage,
    isLoading,
    refreshData,
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
