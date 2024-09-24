import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './About.css'; // Import the CSS file

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">
        Welcome to the online information recording management system for the Ministry of Education of Zanzibar (MOEZ).
      </p>
      <p className="about-description">
        Our platform is designed to streamline the process of recording and managing student information. From demographic details to academic records, we aim to provide a comprehensive solution that is both user-friendly and efficient.
      </p>
      <p className="about-features-title">Features of our system include:</p>
      <ul className="about-features-list">
        <li>Secure login and registration</li>
        <li>Detailed demographic information recording</li>
        <li>Education and academic record management</li>
        <li>Upload and preview of important documents</li>
        <li>Intuitive navigation and user interface</li>
      </ul>
      <p className="contact-info-title">For communication with the Ministry of Education of Zanzibar, please use the following contact details:</p>
      <div className="contact-info">
        <p><FontAwesomeIcon icon={faPhone} className="contact-icon" /> Phone: +255 123 456 789</p>
        <p><FontAwesomeIcon icon={faEnvelope} className="contact-icon" /> Email: support@moez.edu.zn</p>
        <p><FontAwesomeIcon icon={faWhatsapp} className="contact-icon" /> WhatsApp: +255 123 456 789</p>
        <p>
          <FontAwesomeIcon icon={faTwitter} className="contact-icon" /> Twitter: <a href="https://twitter.com/moez" target="_blank" rel="noopener noreferrer" className="contact-link">@moez</a>
        </p>
        <p>
          <FontAwesomeIcon icon={faTelegram} className="contact-icon" /> Telegram: <a href="https://t.me/moez" target="_blank" rel="noopener noreferrer" className="contact-link">@moez</a>
        </p>
      </div>
      <nav>
        <ul className="back-nav">
          <li><Link to="/" className="nav-link">Back to Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default About;
