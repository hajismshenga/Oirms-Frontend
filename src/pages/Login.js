import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    navigate('/demographic'); // Redirect after login
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required className="form-input" />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="login-footer">
        Don't have an account? <Link to="/register" className="register-link">Register</Link>
      </p>
    </div>
  );
}

export default Login;
