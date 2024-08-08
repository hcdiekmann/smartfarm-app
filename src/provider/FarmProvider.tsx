import React, { createContext, useContext, useMemo, useState } from "react";
import { Farm, useFetchFarms } from "@/hooks/farm/useFarms";
import { useAccount } from "./AccountProvider";

type FarmContextType = {
  farms: Farm[];
  currentFarm: Farm | null;
  setCurrentFarm: (farm: Farm | null) => void;
  getUserRole: (farmId: string) => "owner" | "manager" | "worker" | null;
  isLoading: boolean;
  isError: boolean;
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: farms, isLoading, isError } = useFetchFarms();
  const { profile } = useAccount();

  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);

  const getUserRole = useMemo(() => {
    return (farmId: string) => {
      const farm = farms?.find((f) => f.id === farmId);
      if (!farm || !profile) return null;

      const member = farm.members.find((m) => m.profile_id === profile.id);
      return member ? member.role : null;
    };
  }, [farms, profile]);

  return (
    <FarmContext.Provider
      value={{
        farms: farms || [],
        currentFarm,
        setCurrentFarm,
        getUserRole,
        isLoading,
        isError,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error("useFarm must be used within a FarmProvider");
  }
  return context;
};
