// ═══════════════════════════════════════════
//  SYNCARE — pages/NotFoundPage.jsx
// ═══════════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import './NotFoundPage.css';

const NotFoundPage = () => (
  <div className="notfound">
    <div className="notfound__code">404</div>
    <h1>Page not found</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/"><Button variant="primary">Go Home</Button></Link>
  </div>
);

export default NotFoundPage;
