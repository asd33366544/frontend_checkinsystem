// ═══════════════════════════════════════════
//  SYNCARE — api/appointments.js
//  Appointment endpoints: book, fetch, cancel
// ═══════════════════════════════════════════

import api from './apiClient';

/**
 * Book a new appointment.
 * @param {{ date: string, time: string, type: string }} payload
 *   date format: DD/MM/YYYY  |  time format: HH:MM (24h)
 * @returns {{ status, message }}
 */
export const bookAppointment = (payload) =>
  api.post('/book/', payload, true);

/**
 * Fetch all appointments for the authenticated user.
 * @returns {{ status, data: Array<{ appointment_id, appointment_date, appointment_time, appointment_type, appointment_name }> }}
 */
export const fetchAppointments = () =>
  api.get('/appointments/', true);

/**
 * Cancel an appointment.
 * Pass appointment_id as a number, or "*" to cancel ALL.
 * @param {number | "*"} appointmentId
 * @returns {{ status, message }}
 */
export const cancelAppointment = (appointmentId) =>
  api.post('/cancel/', { appointment_id: appointmentId }, true);
