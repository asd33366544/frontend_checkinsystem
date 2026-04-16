// ═══════════════════════════════════════════
//  SYNCARE — pages/DashboardPage.jsx
// ═══════════════════════════════════════════

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deleteAccount } from '../api/auth';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import './DashboardPage.css';

const QUICK_ACTIONS = [
  { emoji: '📅', label: 'Book Appointment', to: '/appointments/book', color: 'blue' },
  { emoji: '📋', label: 'My Appointments',  to: '/appointments',      color: 'purple' },
  { emoji: '🔍', label: 'Lookup Appointment', to: '/appointments/lookup', color: 'green' },
];

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete account. Please try again.');
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__header-inner">
          <div>
            <p className="dashboard__greeting">{greeting()},</p>
            <h1 className="dashboard__name">
              {user?.patient_name || 'Patient'} {user?.patient_gender === 'M' ? '👨' : '👩'}
            </h1>
            <p className="dashboard__meta">
              Patient ID: <strong>#{user?.patient_id}</strong>
            </p>
          </div>
          <div className="dashboard__avatar">
            {(user?.patient_name || 'P')[0].toUpperCase()}
          </div>
        </div>
      </div>

      <div className="dashboard__body">
        {/* Quick actions */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">Quick Actions</h2>
          <div className="dashboard__quick-grid">
            {QUICK_ACTIONS.map(({ emoji, label, to, color }) => (
              <Link key={to} to={to} className={`dashboard__quick-card dashboard__quick-card--${color}`}>
                <span className="dashboard__quick-emoji">{emoji}</span>
                <span className="dashboard__quick-label">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Info card */}
        <section className="dashboard__section">
          <h2 className="dashboard__section-title">Account Information</h2>
          <div className="dashboard__info-card">
            <div className="dashboard__info-row">
              <span className="dashboard__info-label">Name</span>
              <span className="dashboard__info-value">{user?.patient_name || '—'}</span>
            </div>
            <div className="dashboard__info-row">
              <span className="dashboard__info-label">Gender</span>
              <span className="dashboard__info-value">
                {user?.patient_gender === 'M' ? 'Male' : user?.patient_gender === 'F' ? 'Female' : '—'}
              </span>
            </div>
            <div className="dashboard__info-row">
              <span className="dashboard__info-label">Patient ID</span>
              <span className="dashboard__info-value">#{user?.patient_id}</span>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section className="dashboard__section dashboard__danger-zone">
          <h2 className="dashboard__section-title dashboard__danger-title">Danger Zone</h2>
          <p className="dashboard__danger-desc">
            Permanently delete your account and all associated appointments. This cannot be undone.
          </p>
          <Alert type="error" message={deleteError} onDismiss={() => setDeleteError(null)} />

          {!showConfirm ? (
            <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
              Delete Account
            </Button>
          ) : (
            <div className="dashboard__confirm">
              <p>Are you sure? This will delete your account permanently.</p>
              <div className="dashboard__confirm-actions">
                <Button
                  variant="danger"
                  size="sm"
                  loading={deleting}
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
