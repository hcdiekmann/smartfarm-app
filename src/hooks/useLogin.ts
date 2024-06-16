import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/AuthProvider';
import { toast } from 'sonner';

const useLogin = () => {
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const PasswordLogin = async (email: string, password: string) => {
    const { error } = await login(email, password);
    if (error) {
      toast.error('Error while logging in', { duration: 4000, description: `${error.message}` });
    } else {
      navigate('/');
    }
  };

  const GoogleSignin = async () => {
    const { error } = await signInWithGoogle(true);
    if (error) {
      toast.error("Google sign in failed", {
        duration: 4000,
        description: `${error.message}`,
      });
    }
  };

  return {
    PasswordLogin,
    GoogleSignin,
  };
};

export default useLogin;
