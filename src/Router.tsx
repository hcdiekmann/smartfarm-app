import {HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/404';
import AuthCallback from './pages/AuthCallback';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/update-password" element={<UpdatePasswordPage/>} /> {/* Make Private  */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
