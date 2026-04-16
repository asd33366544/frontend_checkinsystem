// ═══════════════════════════════════════════
//  SYNCARE — components/ui/Button.jsx
// ═══════════════════════════════════════════

import React from 'react';
import './Button.css';

/**
 * @param {'primary'|'outline'|'danger'|'success'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} fullWidth
 * @param {boolean} loading
 * @param {boolean} disabled
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'sc-btn',
        `sc-btn--${variant}`,
        `sc-btn--${size}`,
        fullWidth ? 'sc-btn--full' : '',
        loading  ? 'sc-btn--loading' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {loading ? (
        <>
          <span className="sc-btn__spinner" aria-hidden="true" />
          <span className="sc-btn__label">{children}</span>
        </>
      ) : children}
    </button>
  );
};

export default Button;
