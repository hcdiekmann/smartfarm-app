import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";
import { Profile, useFetchProfile } from "@/hooks/auth/useProfile";

interface AccountContextType {
    profile: Profile | undefined;
    isLoading: boolean;
    isError: boolean;
}

const AccountContext = createContext<AccountContextType>({
    profile: undefined,
    isLoading: false,
    isError: false,
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user } = useAuth();
    const { data: profile, isLoading, isError } = useFetchProfile(user?.id ?? '');

    const contextValue: AccountContextType = {
        profile: profile,
        isLoading,
        isError,
    };

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);