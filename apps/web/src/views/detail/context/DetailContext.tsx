import React, { createContext, ReactNode, useContext } from 'react';
import type { VehicleWebDetail } from '../types';

interface DetailContextType {
  vehicle: VehicleWebDetail | null;
}

const DetailContext = createContext<DetailContextType | undefined>(undefined);

interface DetailProviderProps {
  children: ReactNode;
  vehicle: VehicleWebDetail | null;
}

export const DetailProvider: React.FC<DetailProviderProps> = ({ children, vehicle }) => {
  const value: DetailContextType = {
    vehicle,
  };

  return <DetailContext.Provider value={value}>{children}</DetailContext.Provider>;
};

export const useDetail = (): DetailContextType => {
  const context = useContext(DetailContext);
  if (context === undefined) {
    throw new Error('useDetail must be used within a DetailProvider');
  }
  return context;
};
