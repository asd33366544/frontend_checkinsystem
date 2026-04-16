// ═══════════════════════════════════════════
//  SYNCARE — components/ui/Loader.jsx
// ═══════════════════════════════════════════

import React from 'react';
import './Loader.css';

const Loader = ({ size = 'md', label = 'Loading…', overlay = false }) => {
  const el = (
    <div className={`sc-loader sc-loader--${size}`} role="status" aria-label={label}>
      <div className="sc-loader__ring" />
      {label && <span className="sc-loader__label">{label}</span>}
    </div>
  );

  if (overlay) {
    return <div className="sc-loader-overlay">{el}</div>;
  }
  return el;
};

export default Loader;
