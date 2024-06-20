import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";
import RootPage from "@/pages/RootPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import RootSkeleton from "@/components/RootSkeleton";

const Private: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <RootSkeleton />;
  return user ? element : <Navigate to="/login" />;
};

const PrivateRoutes = () => {
  return (
    <>
      <Route path="/" element={<Private element={<RootPage />} />} />
      <Route path="/farm" element={<Navigate to="/" />} />
      <Route path="/employees" element={<Navigate to="/" />} />
      <Route path="/settings" element={<Navigate to="/" />} />
      <Route
        path="/update-password"
        element={<Private element={<UpdatePasswordPage />} />}
      />
    </>
  );
};

export default PrivateRoutes;
