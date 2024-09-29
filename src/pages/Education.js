// Education.js
import React, { useState } from 'react';
import PrimaryEducation from './PrimaryEducation';
import SecondaryEducation from './SecondaryEducation';
import AdvancedEducation from './AdvancedEducation';
import OtherEducation from './OtherEducation';
import './Education.css';

const Education = () => {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('');

  // Handle change for selecting the education level
  const handleEducationLevelChange = (e) => {
    setSelectedEducationLevel(e.target.value);
  };

  return (
    <div className="education-container">
      <h1>Education Information</h1>

      {/* Education Level Selection */}
      <div className="form-group">
        <label htmlFor="educationLevel">Select Education Level:</label>
        <select
          id="educationLevel"
          value={selectedEducationLevel}
          onChange={handleEducationLevelChange}
          className="form-input"
        >
          <option value="">Select Education Level</option>
          <option value="primary">Primary Education</option>
          <option value="secondary">Secondary Education</option>
          <option value="advanced">Advanced Education</option>
          <option value="other">Other Education</option>
        </select>
      </div>

      {/* Render the appropriate form based on the selected education level */}
      {selectedEducationLevel === 'primary' && <PrimaryEducation />}
      {selectedEducationLevel === 'secondary' && <SecondaryEducation />}
      {selectedEducationLevel === 'advanced' && <AdvancedEducation />}
      {selectedEducationLevel === 'other' && <OtherEducation />}
    </div>
  );
};

export default Education;
