import { useEffect, useState } from 'react';
import { useAuth } from '@/provider/AuthProvider';

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

const Greeting = () => {
    const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetingMessage = getGreeting();
    setGreeting(greetingMessage);
  }, []);

  return (<div className="flex items-center">
  <h1 className="text-lg font-semibold md:text-2xl">
    {greeting}, {user?.user_metadata.full_name}
  </h1>
</div>);
};

export default Greeting;