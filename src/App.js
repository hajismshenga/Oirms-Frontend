import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DemographicInfo from './pages/DemographicInfo';
import EducationForm from './pages/EducationForm';
import Academic from './pages/Academic';
import ExtraExperiences from './pages/ExtraExperiences';
import Preview from './pages/Preview';
import About from './pages/About'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/demographic" element={<DemographicInfo />} />
        <Route path="/education" element={<EducationForm />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/extraexperiences" element={<ExtraExperiences />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
