import { LoginForm } from "@/components/LoginForm";
import LogoAndName from '@/components/LogoAndName';
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
      <LogoAndName />
      <div className="mt-8 space-y-6">
        <LoginForm />
        <div className=" text-center text-white text-sm pb-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
