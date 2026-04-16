// ═══════════════════════════════════════════
//  SYNCARE — hooks/useForm.js
//  Reusable form state handler with validation support
// ═══════════════════════════════════════════

import { useState, useCallback } from 'react';
import { runValidation } from '../utils/validators';

/**
 * @param {object} initialValues  Initial field values
 * @param {object} schema         { fieldName: validatorFn, ... }
 * @param {function} onSubmit     Async function called with values when form is valid
 */
const useForm = (initialValues = {}, schema = {}, onSubmit) => {
  const [values, setValues]   = useState(initialValues);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Validate on change if field was already touched
    if (touched[name] && schema[name]) {
      setErrors((prev) => ({ ...prev, [name]: schema[name](value) }));
    }
  }, [touched, schema]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (schema[name]) {
      setErrors((prev) => ({ ...prev, [name]: schema[name](value) }));
    }
  }, [schema]);

  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    // Mark all fields as touched and run full validation
    const allTouched = Object.keys(schema).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const { errors: newErrors, isValid } = runValidation(schema, values);
    setErrors(newErrors);
    if (!isValid) return;

    setSubmitting(true);
    try {
      await onSubmit(values, { setServerError, setServerSuccess });
    } catch (err) {
      setServerError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }, [schema, values, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setServerError(null);
    setServerSuccess(null);
  }, [initialValues]);

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    submitting,
    serverError,
    serverSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setField,
    setServerError,
    setServerSuccess,
  };
};

export default useForm;
