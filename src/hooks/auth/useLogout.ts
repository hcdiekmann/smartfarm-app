import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/AuthProvider';
import { toast } from 'sonner';

const useLogout = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    
    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            toast.error('Error while logging out', { duration: 4000, description: `${error.message}` });
        }
        navigate('/login');
    };

    return handleSignOut;
};

export default useLogout;
