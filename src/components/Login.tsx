
import { useState } from 'react';
import { useNavigate } from "react-router";
import { login } from '../utils/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError('Invalid credentials');
    }
    //Mock the data  for testing
    // const response = { "data": { "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0Nzk3NDI2NiwiZXhwIjoxNzQ3OTc1MTY2LCJpc3MiOiJnZW5jX2NvaG9ydCIsImF1ZCI6WyJHZW5DIl19.oJc4htZNz57gWyCCgtoI9Ft7oLBPLjtzkEBcBmzeE6U", "userId": "admin", "firstName": "RAGUL", "lastName": "M", "role": "Admin", "email": "Ragul.M5@cognizant.com", "phone": "7567171234" } };
    // const { jwt, firstName, role, userId, email, phone } = response.data;
    // localStorage.setItem('jwt', jwt);
    // localStorage.setItem('user', JSON.stringify({ firstName, role, userId, email, phone }));
    // navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete="current-password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;