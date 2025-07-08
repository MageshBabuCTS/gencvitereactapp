import React from 'react';
import { Link } from 'react-router';

function PublicNotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <h1>Public Page Not Found (404)</h1>
      <p>We couldn't find the public page you were looking for.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Go to Home</Link>
    </div>
  );
}

export default PublicNotFoundPage;