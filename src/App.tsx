import React from 'react';
import { AuthProvider } from '@/provider/AuthProvider';
import Router from './Router';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
