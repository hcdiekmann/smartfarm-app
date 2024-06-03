import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';
import LogoAndName from '@/components/LogoAndName';

const ForgotPasswordPage = () => {
    return (
        <div className='min-h-screen bg-gradient-custom flex flex-col justify-center pt-4 pb-4 px-4 sm:px-6 lg:px-8'>
            <LogoAndName />
            <div className="mt-8 space-y-6">
                <ForgotPasswordForm />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

