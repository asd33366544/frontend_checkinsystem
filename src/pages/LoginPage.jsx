// ═══════════════════════════════════════════
//  SYNCARE — pages/LoginPage.jsx
// ═══════════════════════════════════════════

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/forms/LoginForm';
import './AuthPage.css';

const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-page__deco" aria-hidden="true">
        <div className="auth-page__blob auth-page__blob--1" />
        <div className="auth-page__blob auth-page__blob--2" />
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
