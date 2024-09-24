import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExtraExperiences.css'; // Import the CSS file

function ExtraExperiences() {
  const [certificates, setCertificates] = useState([]);
  const [experienceData, setExperienceData] = useState({
    title: '',
    description: '',
    organization: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setCertificates([...certificates, ...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceData({
      ...experienceData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add file upload logic and form data submission here

    // Redirect to the preview page
    navigate('/preview');
  };

  return (
    <div className="extra-experiences-container">
      <h1 className="extra-experiences-title">Extra Experiences</h1>
      <form onSubmit={handleSubmit} className="extra-experiences-form">
        <div className="form-group">
          <label htmlFor="title">Title of Experience:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={experienceData.title}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={experienceData.description}
            onChange={handleInputChange}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={experienceData.organization}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={experienceData.date}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="certificates">Upload Certificates:</label>
          <input
            type="file"
            id="certificates"
            multiple
            onChange={handleFileChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default ExtraExperiences;
