// ═══════════════════════════════════════════
//  SYNCARE — api/auth.js
//  Auth endpoints: signup, signin, delete account
// ═══════════════════════════════════════════

import api from './apiClient';

/**
 * Register a new patient.
 * @param {{ name, age, gender, number, gov_id, password }} payload
 * @returns {{ status, message, id, token }}
 */
export const signup = (payload) => api.post('/signup/', payload, false);

/**
 * Sign in with gov_id + password.
 * @param {{ gov_id, password }} payload
 * @returns {{ status, data: { patient_id, patient_name, patient_gender }, token }}
 */
export const signin = (payload) => api.post('/signin/', payload, false);

/**
 * Delete the currently authenticated user account.
 * Requires a valid JWT (auth = true).
 * @returns {{ status, message }}
 */
export const deleteAccount = () => api.delete('/remove/', true);
