import { Route } from "react-router-dom";
import LoginOAuthCallback from "@/pages/auth/LoginOAuthCallback";
import SignupOAuthCallback from "@/pages/auth/SignupOAuthCallback";
import NotFoundPage from "@/pages/NotFoundPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";

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
