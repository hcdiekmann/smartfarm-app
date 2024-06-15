import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";
import Skeleton from "@/components/Skeleton";
import HomePage from "@/pages/HomePage";
import UpdatePasswordPage from "@/pages/UpdatePasswordPage";

// Private component
const Private: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <Skeleton />;

  return user ? element : <Navigate to="/login" />;
};


const PrivateRoutes = () => {
  return (
    <>
      <Route path="/" element={<Private element={<HomePage />} />} />
      <Route
        path="/update-password"
        element={<Private element={<UpdatePasswordPage />} />}
      />
    </>
  );
};

export default PrivateRoutes;
