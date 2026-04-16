// ═══════════════════════════════════════════
//  SYNCARE — components/forms/SignupForm.jsx
// ═══════════════════════════════════════════

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signup } from '../../api/auth';
import useForm from '../../hooks/useForm';
import {
  validateName,
  validateAge,
  validateGender,
  validatePhone,
  validateGovId,
  validatePassword,
} from '../../utils/validators';
import { GENDER_OPTIONS } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import './AuthForm.css';

const schema = {
  name:     validateName,
  age:      validateAge,
  gender:   validateGender,
  number:   validatePhone,
  gov_id:   validateGovId,
  password: validatePassword,
};

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    values, errors, touched,
    submitting, serverError, serverSuccess,
    handleChange, handleBlur, handleSubmit,
    setServerError,
  } = useForm(
    { name: '', age: '', gender: '', number: '', gov_id: '', password: '' },
    schema,
    async (vals, { setServerError, setServerSuccess }) => {
      try {
        const payload = { ...vals, age: Number(vals.age), gender: vals.gender.toUpperCase() };
        const res = await signup(payload);
        const userData = {
          patient_id:     res.id,
          patient_name:   vals.name,
          patient_gender: vals.gender.toUpperCase(),
        };
        login(userData, res.token);
        setServerSuccess('Account created! Redirecting to your dashboard…');
        setTimeout(() => navigate('/dashboard', { replace: true }), 900);
      } catch (err) {
        setServerError(err.message || 'Registration failed. Please try again.');
      }
    }
  );

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h2>Create account</h2>
        <p>Join SynCare to book appointments easily</p>
      </div>

      <Alert type="error"   message={serverError}   onDismiss={() => setServerError(null)} />
      <Alert type="success" message={serverSuccess} />

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="e.g. Ahmed Hassan"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          required
        />

        <div className="auth-form__row">
          <Input
            label="Age"
            name="age"
            type="number"
            placeholder="e.g. 34"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.age}
            touched={touched.age}
            min={0} max={200}
            required
          />

          <Input
            label="Gender"
            name="gender"
            as="select"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.gender}
            touched={touched.gender}
            required
          >
            <option value="">Select…</option>
            {GENDER_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Input>
        </div>

        <Input
          label="Phone Number"
          name="number"
          type="tel"
          placeholder="e.g. 0123456789"
          value={values.number}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.number}
          touched={touched.number}
          required
        />

        <Input
          label="National ID"
          name="gov_id"
          type="text"
          placeholder="14-digit ID starting with 2 or 3"
          value={values.gov_id}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.gov_id}
          touched={touched.gov_id}
          maxLength={14}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Min 10 characters"
          value={values.password}
          onChange={handleChange}
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
          Create Account
        </Button>
      </form>

      <p className="auth-card__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default SignupForm;
