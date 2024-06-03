import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";
import { IconLoader2 } from "@tabler/icons-react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) { // replace this with dashboard skeleton
    return (
      <div className="flex flex-col justify-center items-center space-y-3 bg-gradient-custom min-h-screen">
        <IconLoader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
