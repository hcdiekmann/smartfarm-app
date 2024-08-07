import React from 'react';
import { useAccount } from '@/provider/AccountProvider';

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
  const { profile } = useAccount();
  const greeting = React.useMemo(() => getGreeting(), []);

  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">
        {greeting}, {profile?.full_name}
      </h1>
    </div>
  );
};

export default React.memo(Greeting);