import { LogoIcon } from "@/components/ui/icons";
import { SignupForm } from "@/components/auth/SignupForm";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
      <LogoIcon className="mx-auto w-20 h-20 lg:w-32 lg:h-32 fill-white" />
      <div className="text-center text-white text-2xl md:text-4xl font-baloo pt-1">
        Smart Farming Africa
      </div>
      <div className="mt-8 space-y-6">
        <SignupForm />
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

export default SignupPage;
