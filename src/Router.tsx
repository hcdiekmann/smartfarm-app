import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import AuthCallback from './components/auth/OAuthCallback';

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
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/update-password" element={<UpdatePasswordPage/>} /> {/* Make Private  */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
