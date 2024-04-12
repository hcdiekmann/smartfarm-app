import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../api/supabaseClient';

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession()
            setUser(session?.user ?? null);
            if (error) {
                console.error('Error fetching session:', error.message);
            }
        };

        fetchData();

        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {

            switch (event) {
                case 'INITIAL_SESSION':
                  console.log('Initial session');
                  setUser(session!.user);
                  break;
                case 'SIGNED_IN':
                  console.log('User signed in');
                  setUser(session!.user);
                  break;
                case 'SIGNED_OUT':
                  console.log('User signed out');
                  break;
                case 'PASSWORD_RECOVERY':
                  console.log('Password recovery mode');
                  break;
                case 'TOKEN_REFRESHED':
                  console.log('Token refreshed');
                  break;
                case 'USER_UPDATED':
                  console.log('User updated');
                  setUser(session!.user);
                  break;
              }
        });

        // Clean up the listener on component unmount
        return () => {
            data.subscription.unsubscribe();
        };

    }, []);

    const value = {
        signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
        signOut: () => supabase.auth.signOut(),
        user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
