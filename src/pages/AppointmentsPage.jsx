// ═══════════════════════════════════════════
//  SYNCARE — pages/AppointmentsPage.jsx
//  Lookup a single appointment and cancel it
// ═══════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppointments from '../hooks/useAppointments';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Loader from '../components/ui/Loader';
import './InnerPage.css';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const { loading, error, appointments, clearError, fetchAll, cancel } = useAppointments();

  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelMsg, setCancelMsg]         = useState(null);
  const [cancelError, setCancelError]     = useState(null);
  const [showCancelAll, setShowCancelAll] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCancel = async (id) => {
    setCancelLoading(true);
    setCancelError(null);
    setCancelMsg(null);
    try {
      const res = await cancel(id);
      if (res) {
        setCancelMsg(res.message || 'Appointment cancelled.');
        await fetchAll(); // Refresh list after cancel
      }
    } catch (err) {
      setCancelError(err?.message || 'Cancel failed.');
    } finally {
      setCancelLoading(false);
      setShowCancelAll(false);
    }
  };

  return (
    <div className="inner-page">
      <button className="inner-page__back" onClick={() => navigate(-1)}>← Back</button>

      <div className="appts-page">
        <div className="appts-page__header">
          <span className="appts-page__tag">📋 Appointments</span>
          <h1>Your Appointments</h1>
          <p>View all your scheduled appointments or cancel them.</p>
        </div>

        {/* Appointments List */}
        <div className="appts-page__card">
          <h2>Scheduled Visits</h2>
          
          {error && <Alert type="error" message={error} onDismiss={clearError} />}

          {loading && !cancelLoading && <Loader size="sm" label="Fetching…" />}

          {!loading && appointments?.length === 0 && (
            <p>You have no upcoming appointments.</p>
          )}

          {!loading && appointments?.length > 0 && (
            <div className="appts-list">
              {appointments.map((appointment) => (
                <div key={appointment.appointment_id} className="appts-page__result">
                  <div className="appts-page__result-grid">
                    <div><span className="appts-page__label">ID</span><span>#{appointment.appointment_id}</span></div>
                    <div><span className="appts-page__label">Date</span><span>{appointment.appointment_date}</span></div>
                    <div><span className="appts-page__label">Time</span><span>{appointment.appointment_time}</span></div>
                    <div><span className="appts-page__label">Clinic</span><span>{appointment.appointment_name}</span></div>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    loading={cancelLoading}
                    onClick={() => handleCancel(appointment.appointment_id)}
                  >
                    Cancel This Appointment
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cancel all */}
        <div className="appts-page__card appts-page__card--danger">
          <h2>Cancel All Appointments</h2>
          <p>This will remove every appointment linked to your account.</p>

          <Alert type="success" message={cancelMsg}  onDismiss={() => setCancelMsg(null)} />
          <Alert type="error"   message={cancelError} onDismiss={() => setCancelError(null)} />

          {!showCancelAll ? (
            <Button variant="danger" size="sm" onClick={() => setShowCancelAll(true)}>
              Cancel All
            </Button>
          ) : (
            <div className="appts-page__confirm">
              <p>This action is irreversible. Are you sure?</p>
              <div className="appts-page__confirm-actions">
                <Button
                  variant="danger"
                  size="sm"
                  loading={cancelLoading}
                  onClick={() => handleCancel('*')}
                >
                  Yes, Cancel All
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowCancelAll(false)}>
                  Go Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
