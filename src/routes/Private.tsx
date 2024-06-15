import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";
import Skeleton from "@/components/Skeleton";

const Private: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { user, loading } = useAuth();

  if (loading) return <Skeleton />;

  return user ? element : <Navigate to="/login" />;
};

export default Private;
