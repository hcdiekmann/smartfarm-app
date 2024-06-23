import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/provider/AuthProvider";
import RootPage from "@/pages/root/RootPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import RootSkeleton from "@/components/RootSkeleton";
import LoginOAuthCallback from "@/pages/auth/LoginOAuthCallback";
import SignupOAuthCallback from "@/pages/auth/SignupOAuthCallback";
import NotFoundPage from "@/pages/NotFoundPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import { useAuth } from "@/provider/AuthProvider";
import FarmPage from "./pages/farm/FarmPage";

const Private: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <RootSkeleton />;
  return user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback/login" element={<LoginOAuthCallback />} />
          <Route
            path="/auth/callback/signup"
            element={<SignupOAuthCallback />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Private Routes */}
          <Route path="/*" element={<Private element={<RootPage />} />} />
          <Route
            path="/farm/*"
            element={<Private element={<FarmPage  />} />}
          />
          <Route
            path="/update-password"
            element={<Private element={<UpdatePasswordPage />} />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
