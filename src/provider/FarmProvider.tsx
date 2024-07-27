import React, { createContext, useContext, useState } from 'react';
import { Farm, useFetchFarms } from '@/hooks/farm/useFarms';


type FarmContextType = {
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm | null) => void;
  farms: Farm[];
  isLoading: boolean;
  isError: boolean;
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const { data: farms, isLoading, isError } = useFetchFarms();

  return (
    <FarmContext.Provider value={{ currentFarm, setCurrentFarm, farms: farms || [], isLoading, isError }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};