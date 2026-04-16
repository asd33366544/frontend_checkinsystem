// ═══════════════════════════════════════════
//  SYNCARE — pages/SignupPage.jsx
// ═══════════════════════════════════════════

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/forms/SignupForm';
import './AuthPage.css';

const SignupPage = () => {
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
      <SignupForm />
    </div>
  );
};

export default SignupPage;
