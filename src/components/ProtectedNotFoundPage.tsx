import React from 'react';
import { Link } from 'react-router';

function ProtectedNotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px',  minHeight: '10vh' }}>
      <h1>Protected Section - Page Not Found (404)</h1>
      <p>The page you tried to access within the protected area does not exist.</p>
      <p>Please check the URL or navigate back.</p>
      <Link to="/home" style={{ color: '#dc3545', textDecoration: 'none' }}>Go to Dashboard Home</Link>
    </div>
  );
}

export default ProtectedNotFoundPage;