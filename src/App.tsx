import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/provider/AuthProvider";
import { FarmProvider } from "@/provider/FarmProvider";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import RootSkeleton from "@/pages/root/RootSkeleton";
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
import RootLayout from "@/pages/root/RootLayout";
import HomePage from "@/pages/root/home/HomePage";
import AccountPage from "@/pages/root/account/AccountPage";
import NewsPage from "@/pages/root/news/NewsPage";
import ShopPage from "@/pages/root/shop/ShopPage";

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
            {/* PUBLIC ROUTES */}
            {/* Auth */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback/login" element={<LoginOAuthCallback />} />
            <Route path="/auth/callback/signup" element={<SignupOAuthCallback />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* PRIVATE ROUTES */}
            {/* Root */}
            <Route path="/" element={<Private element={<RootLayout />} />} >
              <Route index element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/products" element={<ShopPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
          
            {/* Farm */}
            <Route path="/farm/:shortRef" element={<Private element={<FarmLayout />} />}>
              <Route index element={<FarmOverview />} />
              <Route path="assets" element={<AssetsPage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="logs" element={<LogsPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
              <Route path="finances" element={<FinancesPage />} />
            </Route>

            {/* Password Update */}
            <Route path="/update-password" element={<Private element={<UpdatePasswordPage />} />} />

            {/* Fallback 404 Route */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </FarmProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;