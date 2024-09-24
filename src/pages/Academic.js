import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Academic.css'; // Import the CSS

function Academic() {
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // Preview for the passport photo
  const [jobInfo, setJobInfo] = useState({
    companyName: '',
    position: '',
    startDate: '',
    endDate: '',
  });

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPassportPhoto(file);
    setPreview(URL.createObjectURL(file)); // Create a preview URL for the photo
  };

  const handleDeletePhoto = () => {
    setPassportPhoto(null); // Reset the passport photo
    setPreview(null); // Remove the preview
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobInfo({
      ...jobInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save all academic details and upload the passport photo
    // You can handle file upload here if necessary
    navigate('/Extraexperiences'); // Redirect to the next page
  };

  return (
    <div className="academic-wrapper">
      <h1>Academic Information</h1>
      <form className="academic-form" onSubmit={handleSubmit}>
        {/* Academic Information Fields */}
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={jobInfo.companyName}
            onChange={handleInputChange}
            required
            placeholder="Enter company name"
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={jobInfo.position}
            onChange={handleInputChange}
            required
            placeholder="Enter position"
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={jobInfo.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
       

        {/* Passport Photo Upload */}
        <div className="form-group">
          <label>Upload Passport Size Photo:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*" // Accept only image files
            required
          />
        </div>

        {/* Display Passport Photo if Uploaded */}
        {preview && (
          <div className="photo-preview">
            <img src={preview} alt="Passport Preview" className="passport-photo" />
            <button type="button" className="delete-photo-btn" onClick={handleDeletePhoto}>
              Delete Photo
            </button>
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="save-btn">Save And Confirm

          </button>
        </div>
      </form>
    </div>
  );
}

export default Academic;
