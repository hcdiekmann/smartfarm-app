import React from 'react';
import { UpdatePasswordForm } from '@/components/UpdatePasswordForm';

const UpdatePasswordPage = () => {
    return (
        <div className='min-h-screen bg-gradient-custom flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
            <div>
                <img
                    alt="Smart Farming Africa Logo"
                    className="mx-auto w-32 h-32"
                    height="48"
                    src="assets/logo_white.svg"
                    style={{
                        aspectRatio: "48/48",
                        objectFit: "cover",
                    }}
                    width="48"
                />
                <div className='text-center text-white text-4xl font-baloo'>
                    Smart Farming Africa
                </div>
            </div>
            <div className="mt-8 space-y-6">
                <UpdatePasswordForm />
            </div>
        </div>
    );
};

export default UpdatePasswordPage;

