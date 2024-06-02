import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../api/supabase/client";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (!accessToken || !refreshToken) {
        console.error("Missing tokens in URL hash");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("Error setting session: ", error);
        toast.error("Authentication failed", {
            duration: 4000,
            description: `${error.message}`,
          });
          navigate("/login");
      } else {
        // Redirect to Dashboard
        navigate("/");
      }
    };

    handleAuth();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col justify-center items-center space-y-3 bg-gradient-custom min-h-screen">
        <IconLoader2 className="w-12 h-12 text-white animate-spin" />
    </div>
  )
};

export default AuthCallback;
