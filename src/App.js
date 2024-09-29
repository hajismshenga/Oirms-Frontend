// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Import LandingPage
import DashboardLayout from './components/DashboardLayout';
import Profile from './pages/Profile'; // Import Profile component
import Login from './pages/Login';
import Register from './pages/Register';
import DemographicInfo from './pages/DemographicInfo';
import PrimaryEducation from './pages/PrimaryEducation';
import SecondaryEducation from './pages/SecondaryEducation';
import AdvancedEducation from './pages/AdvancedEducation';
import OtherEducation from './pages/OtherEducation';
import WorkExperience from './pages/WorkExperience';
import Preview from './pages/Preview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Add route for Profile */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/demographic" element={<DemographicInfo />} />
          <Route path="/education/primary" element={<PrimaryEducation />} />
          <Route path="/education/secondary" element={<SecondaryEducation />} />
          <Route path="/education/advanced" element={<AdvancedEducation />} />
          <Route path="/education/other" element={<OtherEducation />} />
          <Route path="/workexperience" element={<WorkExperience />} />
          <Route path="/preview" element={<Preview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
