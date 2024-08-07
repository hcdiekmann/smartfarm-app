import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useAuth } from "./AuthProvider";
import { Profile, useFetchProfile } from "@/hooks/auth/useProfile";

interface AccountContextType {
    profile: Profile | null;
    loading: boolean;
}

const AccountContext = createContext<AccountContextType>({
    profile: null,
    loading: true,
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user } = useAuth();
    const { data: profile, isLoading, isError } = useFetchProfile(user?.id ?? '');

    const contextValue = useMemo(() => ({
        profile: profile ?? null,
        loading: isLoading || (!!user && !profile && !isError),
    }), [profile, isLoading, user, isError]);

    if (isError) {
        console.error("Error loading profile");
    }

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