import { Route } from "react-router-dom";
import LoginOAuthCallback from "@/components/auth/LoginOAuthCallback";
import SignupOAuthCallback from "@/components/auth/SignupOAuthCallback";
import NotFoundPage from "@/pages/404";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";

const PublicRoutes = () => {
  return (
    <>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback/login" element={<LoginOAuthCallback />} />
      <Route path="/auth/callback/signup" element={<SignupOAuthCallback />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
};

export default PublicRoutes;
