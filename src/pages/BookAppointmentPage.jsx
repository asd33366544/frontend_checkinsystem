// ═══════════════════════════════════════════
//  SYNCARE — pages/BookAppointmentPage.jsx
// ═══════════════════════════════════════════

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from '../components/forms/AppointmentForm';
import './InnerPage.css';

const BookAppointmentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="inner-page">
      <button className="inner-page__back" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <AppointmentForm onSuccess={() => setTimeout(() => navigate('/appointments'), 1500)} />
    </div>
  );
};

export default BookAppointmentPage;
