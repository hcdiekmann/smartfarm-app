import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../api/supabase/client";
import { toast } from "sonner";
import RootSkeleton from "@/components/RootSkeleton";


const LoginOAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (!accessToken || !refreshToken) {
        navigate("/login");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        toast.error("Authentication failed", {
          duration: 4000,
          description: `${error.message}`,
        });
        navigate("/login");
      } else {
        navigate("/");
      }
    };

    handleAuth();
  }, [location.hash]);

  return <RootSkeleton />;
};

export default LoginOAuthCallback;
