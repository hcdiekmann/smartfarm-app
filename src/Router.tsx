import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginOAuthCallback from './components/auth/LoginOAuthCallback';
import SignupOAuthCallback from './components/auth/SignupOAuthCallback';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/404';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback/login" element={<LoginOAuthCallback />} />
        <Route path="/auth/callback/signup" element={<SignupOAuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/update-password" element={<PrivateRoute><UpdatePasswordPage/></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
