import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
    navigate('/login'); // Redirect after registration
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required className="form-input" />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="register-footer">
        Already have an account? <Link to="/login" className="login-link">Login</Link>
      </p>
    </div>
  );
}

export default Register;
