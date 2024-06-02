import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError, AuthTokenResponsePassword, UserResponse, AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { supabase } from '../api/supabase/client';

interface AuthContextType {
  user: User | null;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<AuthResponse>;
  updatePassword: (password: string) => Promise<UserResponse>;
  signIn: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
  signInWithGoogle: () => Promise<OAuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{
    data: {};
    error: null;
  } | {
    data: null;
    error: AuthError;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      setUser(session?.user ?? null);
      if (error) {
        console.error('Error fetching session:', error.message);
      }
    };

    getSession();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {

      switch (event) {
        case 'INITIAL_SESSION':
          setUser(session?.user ?? null);
          break;
        case 'SIGNED_IN':
          console.log('User signed in');
          setUser(session?.user ?? null);
          break;
        case 'SIGNED_OUT':
          console.log('User signed out');
          setUser(null);
          break;
        case 'PASSWORD_RECOVERY':
          console.log('Password recovery mode');
          break;
        case 'TOKEN_REFRESHED':
          console.log('Token refreshed');
          break;
        case 'USER_UPDATED':
          console.log('User updated');
          setUser(session?.user ?? null);
          break;
      }
    });

    // Clean up the listener on component unmount
    return () => {
      data.subscription.unsubscribe();
    };

  }, []);

  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    const authResponse = await supabase.auth.signUp({ email, password });
    if (authResponse.data.user) {
      await setUserName(firstName, lastName); //TODO: fix this, cant update user if not auto confirmed
    }
    return authResponse;
  }

  const signInWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://app.smartfarm.ing/auth/callback`,
      },
    });
  };


  const setUserName = async (firstName: string, lastName: string) => {
    return await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    })
  }	

    const value = {
      user,
      signUp: signUp,
      signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
      signInWithGoogle,
      signOut: () => supabase.auth.signOut(),
      resetPassword: (email: string) => supabase.auth.resetPasswordForEmail(email, { redirectTo: '/update-password' }),
      updatePassword: (newPassword: string) => supabase.auth.updateUser({ password: newPassword }),
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
