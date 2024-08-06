import React from 'react';
import { useAuth } from '@/provider/AuthProvider';

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 3) return 'Good night';
  if (currentHour < 11) return 'Good morning';
  if (currentHour < 13) return 'Good day';
  if (currentHour < 18) return 'Good afternoon';
  if (currentHour < 22) return 'Good evening';
  return 'Good night';
};

const Greeting = () => {
  const { user } = useAuth();
  const greeting = React.useMemo(() => getGreeting(), []);

  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">
        {greeting}, {user?.user_metadata.full_name}
      </h1>
    </div>
  );
};

export default React.memo(Greeting);