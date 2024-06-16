import { LogoIcon } from "@/components/Icons";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";

const UpdatePasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-custom flex flex-col justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8">
      <LogoIcon className="mx-auto w-24 h-24 lg:w-32 lg:h-32 fill-white" />
      <div className="text-center text-white text-2xl md:text-4xl font-baloo pt-1">
        Smart Farming Africa
      </div>
      <div className="mt-8 space-y-6">
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
