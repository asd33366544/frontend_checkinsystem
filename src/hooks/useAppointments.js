// ═══════════════════════════════════════════
//  SYNCARE — hooks/useAppointments.js
//  Encapsulates appointment CRUD with loading/error state
// ═══════════════════════════════════════════

import { useState, useCallback } from 'react';
import {
  bookAppointment,
  fetchAppointments,
  cancelAppointment,
} from '../api/appointments';

const useAppointments = () => {
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [location, setLocation] = useState(null);

  const clearError = () => setError(null);

  /** Book a new appointment */
  const book = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookAppointment(payload);
      return res;
    } catch (err) {
      setError(err.message || 'Failed to book appointment.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Fetch all appointments */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAppointments();
      setAppointments(res.data || []);
      if (res.location) {
        setLocation(res.location);
      }
      return res.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch appointments.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Cancel appointment(s) */
  const cancel = useCallback(async (appointmentId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cancelAppointment(appointmentId);
      return res;
    } catch (err) {
      setError(err.message || 'Failed to cancel appointment.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, appointments, location, setAppointments, clearError, book, fetchAll, cancel };
};

export default useAppointments;
