import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../../api/supabase/client";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { SignupForm } from "../SignupForm";

const SignupOAuthCallback = () => {
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
        navigate("/signup");
      } else {
        // Redirect to Dashboard
        navigate("/");
      }
    };

    handleAuth();
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
      <IconLoader2
        stroke={2}
        className="w-16 h-16 md:w-32 md:h-32 text-white text-center animate-spin"
      />
      <div className="text-center text-white text-2xl md:text-4xl font-baloo">
        Smart Farming Africa
      </div>
      <div className="mt-8 space-y-6">
        <SignupForm OAuthCallback={true} />
        <div className=" text-center text-white text-sm pb-4">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupOAuthCallback;
