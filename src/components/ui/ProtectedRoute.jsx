// ═══════════════════════════════════════════
//  SYNCARE — components/ui/ProtectedRoute.jsx
//  Redirects unauthenticated users to /login
// ═══════════════════════════════════════════

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
