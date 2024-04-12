import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/AuthProvider';
import { Button } from "@/components/ui/button";

const HomePage = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    
    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        }
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome, {user?.email}</h1>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
};

export default HomePage;
