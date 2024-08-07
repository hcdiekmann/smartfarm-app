import React, { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { Profile, useFetchProfile } from "@/hooks/account/useProfile";

interface AccountContextType {
    profile: Profile | null;
    isLoading: boolean;
}

const AccountContext = createContext<AccountContextType>({
    profile: null,
    isLoading: true,
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user } = useAuth();
    const { data: profile, isLoading } = useFetchProfile(user?.id ?? "");

    const contextValue = useMemo(() => ({
        profile: profile ?? null,
        isLoading,
    }), [user, profile, isLoading]);

  

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = (): AccountContextType => {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error("useAccount must be used within an AccountProvider");
    }
    return context;
};