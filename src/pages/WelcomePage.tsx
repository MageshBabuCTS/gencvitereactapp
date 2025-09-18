import { Link } from 'react-router';

function WelcomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <h1>Welcome Page</h1>     
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Go to Home</Link>
    </div>
  );
}

export default WelcomePage;