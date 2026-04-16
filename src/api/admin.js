// ═══════════════════════════════════════════
//  SYNCARE — api/admin.js
//  Admin endpoints (password-based, no JWT)
// ═══════════════════════════════════════════

import api from './apiClient';

/**
 * Fetch patient data.
 * @param {{ password: string, id: number }} payload
 * @returns {{ status, data }}
 */
export const adminFetchUser = (payload) =>
  api.post('/admin/users/', payload, false);

/**
 * Fetch appointment data.
 * appointment_id takes precedence over patient_id when non-zero.
 * Set either field to 0 to mark as "not specified" (not both).
 * @param {{ password: string, patient_id: number, appointment_id: number }} payload
 * @returns {{ status, data }}
 */
export const adminFetchAppointment = (payload) =>
  api.post('/admin/appointments/', payload, false);
