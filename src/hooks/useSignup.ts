import { useNavigate } from "react-router-dom";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";

const useSignup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const PasswordSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    const { error, data } = await signUp(name, email, password);
    if (error) {
      toast.error("Signup failed", {
        duration: 5000,
        description: `${error.message}`,
      });
    }
    if (data.user) {
      toast.info("Signup successful", {
        duration: 5000,
        description: "Check your email to confirm your account",
      });
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return PasswordSignup;
};

export default useSignup;
