import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase/client';
import { User, AuthError, AuthTokenResponsePassword, UserResponse, AuthResponse, OAuthResponse } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
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
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        setUser(null);
      }
      if (data?.session?.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    };

    getSession();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'USER_UPDATED':
          if (session?.user) {
            setUser(session.user);
          }
          break;
        case 'SIGNED_OUT':
          setUser(null);
          break;
        case 'PASSWORD_RECOVERY':
          console.log('Password recovery mode');
          navigate('/update-password');
          break;
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    const authResponse = await supabase.auth.signUp(
      {
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      },);
    
    return authResponse;
  };

  const signInWithGoogle = async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn: (email: string, password: string) => supabase.auth.signInWithPassword({ email, password }),
    signInWithGoogle,
    signOut: () => supabase.auth.signOut(),
    resetPassword: (email: string) => supabase.auth.resetPasswordForEmail(email, { redirectTo: '/update-password' }),
    updatePassword: (newPassword: string) => supabase.auth.updateUser({ password: newPassword }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
