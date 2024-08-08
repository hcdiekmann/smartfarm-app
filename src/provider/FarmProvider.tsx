import React, { createContext, useContext, useState } from 'react';
import { Farm, useFetchFarms } from '@/hooks/farm/useFarms';
import { useAccount } from './AccountProvider';


type FarmContextType = {
  farms: Farm[];
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm | null) => void;
  owner: boolean;
  isLoading: boolean;
  isError: boolean;
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: farms, isLoading, isError } = useFetchFarms();
  const { profile } = useAccount();
  
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);

  const owner = currentFarm?.owner_id === profile?.id;

  return (
    <FarmContext.Provider value={{farms: farms || [], currentFarm, setCurrentFarm,owner, isLoading, isError }}>
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