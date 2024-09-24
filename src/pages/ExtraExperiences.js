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

  // Handle file change and preview
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to Array
    setCertificates((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Delete a selected file
  const handleDeleteFile = (index) => {
    setCertificates((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceData({
      ...experienceData,
      [name]: value,
    });
  };

  // Handle form submission
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
       

        {/* File Upload */}
        <div className="form-group">
          <label htmlFor="certificates">Upload Certificates:</label>
          <input
            type="file"
            id="certificates"
            multiple
            onChange={handleFileChange}
            className="form-input"
            required
          />
        </div>

        {/* Display uploaded files with delete button */}
        <div className="uploaded-files">
          <h3>Uploaded Certificates:</h3>
          {certificates.length > 0 ? (
            <div className="uploaded-files-grid">
              {certificates.map((file, index) => (
                <div key={index} className="uploaded-file-item">
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt={file.name} className="uploaded-file-image" />
                  ) : (
                    <p>{file.name}</p>
                  )}
                  <button type="button" onClick={() => handleDeleteFile(index)} className="delete-button">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>

        <button type="submit" className="next-button">Save And Confirm</button>
      </form>
    </div>
  );
}

export default ExtraExperiences;
