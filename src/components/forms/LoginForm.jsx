// ═══════════════════════════════════════════
//  SYNCARE — components/forms/LoginForm.jsx
// ═══════════════════════════════════════════

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signin } from '../../api/auth';
import useForm from '../../hooks/useForm';
import { validateGovId, validatePassword } from '../../utils/validators';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import './AuthForm.css';

const schema = {
  gov_id:   validateGovId,
  password: validatePassword,
};

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    values, errors, touched,
    submitting, serverError, serverSuccess,
    handleChange, handleBlur, handleSubmit,
    setServerError,
  } = useForm(
    { gov_id: '', password: '' },
    schema,
    async (vals, { setServerError, setServerSuccess }) => {
      try {
        const res = await signin(vals);
        login(res.data, res.token);
        setServerSuccess('Signed in successfully! Redirecting…');
        setTimeout(() => navigate(from, { replace: true }), 800);
      } catch (err) {
        setServerError(err.message || 'Invalid credentials. Please try again.');
      }
    }
  );

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h2>Welcome back</h2>
        <p>Sign in to manage your appointments</p>
      </div>

      <Alert type="error"   message={serverError}   onDismiss={() => setServerError(null)} />
      <Alert type="success" message={serverSuccess} />

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="National ID"
          name="gov_id"
          type="text"
          placeholder="e.g. 29801012345678"
          value={values.gov_id}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.gov_id}
          touched={touched.gov_id}
          required
          maxLength={14}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Min 10 characters"
          value={values.password}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F]/g, '');
            handleChange(e);
          }}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={submitting}
          className="auth-card__submit"
        >
          Sign In
        </Button>
      </form>

      <p className="auth-card__footer">
        Don't have an account?{' '}
        <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
};

export default LoginForm;
