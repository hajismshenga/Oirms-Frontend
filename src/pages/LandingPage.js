// LandingPage.js
import React, { useState } from 'react';
import About from './About'; // Import About component
import './LandingPage.css'; // Import CSS file for styling
import logo from '../assets/images/smz.png'; // Adjusted path for logo

function LandingPage() {
  const [showAbout, setShowAbout] = useState(false); // State to toggle About section visibility

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <img src={logo} alt="OIRMS Logo" className="logo" />
        <h1 className="header-title">OIRMS</h1>
        <div className="header-dashboard">
          <a href="/dashboard" className="dashboard-link">User Dashboard</a>
        </div>
      </header>

      {/* Main Content */}
      <div className="content-box">
        <h2 className="ministry-title">Ministry of Education and Vocational Training, Zanzibar</h2>
        <div className="button-box">
          <div className="button-container">
            <button className="btn about-button" onClick={() => setShowAbout(!showAbout)}>
              {showAbout ? "Hide About" : "About"}
            </button>
            <a href="/login" className="btn login-button">Login</a>
            <a href="/register" className="btn register-button">Register</a>
          </div>
          {showAbout && <About />}
        </div>
    
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Copyright © | OIRMS | All rights reserved. Version 1.0.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
