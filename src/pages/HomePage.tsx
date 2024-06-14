import { useAuth } from '@/provider/AuthProvider';
import LogoutButton from '@/components/auth/LogoutButton';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Welcome, {user?.user_metadata.name}</h1>
            <LogoutButton />
        </div>
    );
};
export default HomePage;
