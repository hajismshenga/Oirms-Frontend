import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className="dashboard">
      
      <img src="smz.png" alt="Dashboard" className="dashboard-image" />
      <h1 className="welcome-marquee"><i><b>THE MINISTRY OF EDUCATION AND VOCATIONAL TRAINING</b></i></h1>
      <h2 className="intro-text">Welcome, Online Informations Record Management System</h2>
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="footer">
       { /*<p>Ministry of Education Leaders</p>*/}
        <p>&copy; {currentYear} Ministry of Education and Vocational Training, Zanzibar</p>
      </div>
    </div>
  );
}

export default Dashboard;
