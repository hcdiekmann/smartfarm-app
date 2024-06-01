import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../api/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
        <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
      <Skeleton className="h-[200px] w-[300px] rounded-xl">
        <div className="p-4">
            Authenticating...
        </div>
      </Skeleton>
      <div className="space-y-2">
        <Skeleton className="h-6 w-[300px]" />
        <Skeleton className="h-6 w-[250px]" />
      </div>
    </div>
  )
};

export default AuthCallback;
