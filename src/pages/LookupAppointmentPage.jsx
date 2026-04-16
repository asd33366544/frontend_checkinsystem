// ═══════════════════════════════════════════
//  SYNCARE — pages/LookupAppointmentPage.jsx
// ═══════════════════════════════════════════

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentsPage from './AppointmentsPage';

// Alias – the AppointmentsPage already handles lookup.
// This file exists so the router can mount it at /appointments/lookup
const LookupAppointmentPage = () => <AppointmentsPage />;

export default LookupAppointmentPage;
