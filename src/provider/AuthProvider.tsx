import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  AuthError,
  AuthTokenResponsePassword,
  UserResponse,
  AuthResponse,
  OAuthResponse,
} from "@supabase/supabase-js";
import { supabase } from "../api/supabase/client";
import { useNavigate } from "react-router-dom";

type PasswordResetResponse = {
  data: {};
  error: null;
}
| {
  data: null;
  error: AuthError;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<AuthTokenResponsePassword>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  signInWithGoogle: (isLogin: boolean) => Promise<OAuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updatePassword: (password: string) => Promise<UserResponse>;
  resetPassword: (email: string) => Promise<PasswordResetResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      if (user) return setLoading(false);

      const { data, error } = await supabase.auth.getSession();
      console.log("getSession", data, error);
      if (error) {
        console.error("Error fetching session:", error.message);
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "INITIAL_SESSION":
          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
          case "USER_UPDATED":
            if (session?.user) {
              setUser(session.user);
            }
            break;
          case "SIGNED_OUT":
            setUser(null);
            break;
          case "PASSWORD_RECOVERY":
            navigate("/update-password");
            break;
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    const authResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          email: email,
        },
      },
    });

    return authResponse;
  };

  const signInWithGoogle = async (isLogin: boolean) => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback/${
          isLogin ? "login" : "signup"
        }`,
      },
    });
  };

  const value = {
    user,
    loading,
    signUp,
    login: (email: string, password: string) =>
      supabase.auth.signInWithPassword({ email, password }),
    signInWithGoogle,
    signOut: () => supabase.auth.signOut(),
    resetPassword: (email: string) =>
      supabase.auth.resetPasswordForEmail(email),
    updatePassword: (newPassword: string) =>
      supabase.auth.updateUser({ password: newPassword }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
