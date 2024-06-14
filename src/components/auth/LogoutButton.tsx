import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/AuthProvider';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const LogoutButton = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    
    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            toast.error('Error logging out', { duration: 4000, description: `${error.message}` });
        }
        navigate('/login');
    };

    return (
        <div>
            <Button onClick={handleSignOut}>Logout</Button>
        </div>
    );
};

export default LogoutButton;
