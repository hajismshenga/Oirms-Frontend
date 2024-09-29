// DashboardLayout.js
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

function DashboardLayout() {
  const navigate = useNavigate();
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('');

  // Handle selection of education level
  const handleEducationLevelChange = (e) => {
    setSelectedEducationLevel(e.target.value);
    navigate(`/education/${e.target.value}`); // Navigate to respective form based on the selected education level
  };

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-brand">User Dashboard</h1>
        <ul className="navbar-links">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Dashboard Layout with Sidebar and Main Content */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li><Link to="/demographic">Demographic Info</Link></li>

            {/* Education Dropdown */}
            <li>
              <label htmlFor="educationLevel">Education Levels</label>
              <select
                id="educationLevel"
                value={selectedEducationLevel}
                onChange={handleEducationLevelChange}
                className="sidebar-dropdown"
              >
                <option value="">Select Education Level</option>
                <option value="primary">Primary Education</option>
                <option value="secondary">Secondary Education</option>
                <option value="advanced">Advanced Education</option>
                <option value="other">Other Education</option>
              </select>
            </li>

            <li><Link to="/workexperience">Work Experience</Link></li>
            <li><Link to="/preview">Preview Info</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <Outlet /> {/* This will render the selected form from the sidebar dropdown */}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
