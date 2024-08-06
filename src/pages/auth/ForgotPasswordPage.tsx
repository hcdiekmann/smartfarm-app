import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { LogoIcon } from "@/components/ui/icons";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
      <LogoIcon className="mx-auto w-24 h-24 lg:w-32 lg:h-32 fill-white" />
      <div className="text-center text-white text-2xl md:text-4xl font-baloo pt-1">
        Smart Farming Africa
      </div>
      <div className="mt-8 space-y-6">
        <ForgotPasswordForm />
      </div>
      <div className=" text-center text-white text-sm pt-4 pb-4">
        <Link to="/login" className="underline">
          Login
        </Link>
        <span className="mx-2 text-white">|</span>
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
