import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import { FarmProvider } from "@/provider/FarmProvider";
import RootPage from "@/pages/root/RootPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import RootSkeleton from "@/components/RootSkeleton";
import LoginOAuthCallback from "@/pages/auth/LoginOAuthCallback";
import SignupOAuthCallback from "@/pages/auth/SignupOAuthCallback";
import NotFoundPage from "@/pages/NotFoundPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import FarmOverview from "@/pages/farm/overview/FarmOverview";
import FinancesPage from "@/pages/farm/finances/FinancesPage";
import AssetsPage from "@/pages/farm/assets/AssetsPage";
import FarmLayout from "@/pages/farm/FarmLayout";
import PeoplePage from "@/pages/farm/people/PeoplePage";
import InvoicesPage from "@/pages/farm/invoices/InvoicesPage";
import LogsPage from "@/pages/farm/logs/LogsPage";
import TasksPage from "@/pages/farm/tasks/TasksPage";

const Private: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <RootSkeleton />;
  return user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FarmProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback/login" element={<LoginOAuthCallback />} />
            <Route path="/auth/callback/signup" element={<SignupOAuthCallback />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Private Routes */}
            <Route path="/*" element={<Private element={<RootPage />} />} />
            <Route path="/farm/:shortRef" element={<Private element={<FarmLayout />} />}>
              <Route index element={<FarmOverview />} />
              <Route path="assets" element={<AssetsPage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="logs" element={<LogsPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
              <Route path="finances" element={<FinancesPage />} />
            </Route>
            <Route path="/update-password" element={<Private element={<UpdatePasswordPage />} />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FarmProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;