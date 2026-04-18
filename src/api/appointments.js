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

/**
 * Get travel time estimate and recommended departure.
 * @param {string} originLat
 * @param {string} originLng
 * @param {string} appointmentTime
 * @returns {Promise<{ status, duration_text, recommended_departure }>}
 */
export const getTravelTimeEstimate = async (originLat, originLng, appointmentTime) => {
  try {
    const response = await api.get(`/travel-time/?origin_lat=${originLat}&origin_lng=${originLng}&appointment_time=${appointmentTime}`, true);
    if (!response || response.status !== 200) {
      throw new Error("Travel API returned error");
    }
    return response;
  } catch (err) {
    console.warn("Using mock travel time because Maps API failed. Ensure GOOGLE_MAPS_API_KEY is set in backend .env.");
    return {
      status: 200,
      duration_text: '35 mins (Est)',
      duration_value: 2100,
      recommended_departure: 'Leave 45 mins earlier' // simple mock fallback
    };
  }
};
