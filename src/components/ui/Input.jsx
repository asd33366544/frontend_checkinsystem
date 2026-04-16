// ═══════════════════════════════════════════
//  SYNCARE — components/ui/Input.jsx
// ═══════════════════════════════════════════

import React from 'react';
import './Input.css';

/**
 * Reusable Input / Select / Textarea
 * Props:
 *   label, name, error, touched, type, as ('input'|'select'|'textarea'), ...rest
 */
const Input = ({
  label,
  name,
  error,
  touched,
  as: Tag = 'input',
  children,
  required: isRequired,
  className = '',
  ...rest
}) => {
  const hasError = touched && error;

  return (
    <div className={`sc-field ${hasError ? 'sc-field--error' : ''} ${className}`}>
      {label && (
        <label htmlFor={name} className="sc-field__label">
          {label}
          {isRequired && <span className="sc-field__req" aria-hidden="true"> *</span>}
        </label>
      )}
      <Tag
        id={name}
        name={name}
        aria-invalid={hasError ? 'true' : undefined}
        aria-describedby={hasError ? `${name}-err` : undefined}
        className="sc-field__control"
        {...rest}
      >
        {children}
      </Tag>
      {hasError && (
        <p id={`${name}-err`} className="sc-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
