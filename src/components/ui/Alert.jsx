// ═══════════════════════════════════════════
//  SYNCARE — components/ui/Alert.jsx
// ═══════════════════════════════════════════

import React from 'react';
import './Alert.css';

/**
 * @param {'error'|'success'|'warning'|'info'} type
 * @param {string} message
 * @param {function} onDismiss  optional dismiss handler
 */
const ICONS = { error: '✖', success: '✔', warning: '⚠', info: 'ℹ' };

const Alert = ({ type = 'error', message, onDismiss, className = '' }) => {
  if (!message) return null;
  return (
    <div
      className={`sc-alert sc-alert--${type} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <span className="sc-alert__icon" aria-hidden="true">{ICONS[type]}</span>
      <span className="sc-alert__msg">{message}</span>
      {onDismiss && (
        <button
          className="sc-alert__close"
          onClick={onDismiss}
          aria-label="Dismiss"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
