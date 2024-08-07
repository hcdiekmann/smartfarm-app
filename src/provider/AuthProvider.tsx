import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
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

type PasswordResetResponse =
  | {
      data: {};
      error: null;
    }
  | {
      data: null;
      error: AuthError;
    };

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        setUser(null);
      } else if (data?.session?.user) {
        setUser(data.session.user);
      }
      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === "PASSWORD_RECOVERY") {
          navigate("/update-password");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<AuthResponse> => {
      return await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            email: email,
          },
        },
      });
    },
    []
  );

  const signInWithGoogle = useCallback(
    async (isLogin: boolean): Promise<OAuthResponse> => {
      return await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback/${
            isLogin ? "login" : "signup"
          }`,
        },
      });
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      signUp,
      login: (email: string, password: string) =>
        supabase.auth.signInWithPassword({ email, password }),
      signInWithGoogle,
      signOut: () => supabase.auth.signOut(),
      resetPassword: (email: string) =>
        supabase.auth.resetPasswordForEmail(email),
      updatePassword: (newPassword: string) =>
        supabase.auth.updateUser({ password: newPassword }),
    }),
    [user, isLoading, signUp, signInWithGoogle]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
