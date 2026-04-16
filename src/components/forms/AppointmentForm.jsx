// ═══════════════════════════════════════════
//  SYNCARE — components/forms/AppointmentForm.jsx
// ═══════════════════════════════════════════

import React from 'react';
import useForm from '../../hooks/useForm';
import useAppointments from '../../hooks/useAppointments';
import {
  validateDate,
  validateTime,
  validateClinicType,
} from '../../utils/validators';
import { CLINIC_TYPES } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import './AppointmentForm.css';

const schema = {
  date: validateDate,
  time: validateTime,
  type: (v) => validateClinicType(v, CLINIC_TYPES),
};

/** Convert native date input value (YYYY-MM-DD) → DD/MM/YYYY */
const toApiDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

/** Today as YYYY-MM-DD for min attribute */
const todayISO = () => new Date().toISOString().split('T')[0];

const AppointmentForm = ({ onSuccess }) => {
  const { book } = useAppointments();

  const {
    values, errors, touched,
    submitting, serverError, serverSuccess,
    handleChange, handleBlur, handleSubmit,
    setServerError, setServerSuccess,
  } = useForm(
    { date: '', time: '', type: '' },
    schema,
    async (vals, { setServerError, setServerSuccess }) => {
      const payload = {
        date: toApiDate(vals.date),
        time: vals.time,
        type: vals.type,
      };
      try {
        const res = await book(payload);
        if (res) {
          setServerSuccess(res.message || 'Appointment booked successfully!');
          if (onSuccess) onSuccess(res);
        }
      } catch (err) {
        setServerError(err?.message || 'Failed to book appointment.');
      }
    }
  );

  return (
    <div className="appt-form-card">
      <div className="appt-form-card__header">
        <span className="appt-form-card__tag">📅 New Appointment</span>
        <h2>Book Your Visit</h2>
        <p>Choose a clinic, date and time. We'll confirm availability.</p>
      </div>

      <Alert type="error"   message={serverError}   onDismiss={() => setServerError(null)} />
      <Alert type="success" message={serverSuccess} />

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Clinic / Department"
          name="type"
          as="select"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.type}
          touched={touched.type}
          required
        >
          <option value="">Select a clinic…</option>
          {CLINIC_TYPES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Input>

        <div className="appt-form__row">
          <Input
            label="Date"
            name="date"
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.date}
            touched={touched.date}
            required
          />

          <Input
            label="Time (24h)"
            name="time"
            type="time"
            step="900"
            value={values.time}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.time}
            touched={touched.time}
            required
          />
        </div>

        {/* Preview */}
        {values.type && values.date && values.time && (
          <div className="appt-form__preview">
            <span>📋</span>
            <div>
              <strong>{values.type}</strong>
              <span> — {toApiDate(values.date)} at {values.time}</span>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={submitting}
        >
          ✅ Confirm Appointment
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
