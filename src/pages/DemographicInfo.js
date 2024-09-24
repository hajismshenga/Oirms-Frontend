import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemographicInfo.css'; // Import the CSS file

function DemographicInfo() {
  const [birthCertificate, setBirthCertificate] = useState(null);
  const [previewURL, setPreviewURL] = useState(null); // State to store the preview URL
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    address: '',
    nationality: '',
    gender: '',
    phoneNumber: '',
    email: ''
  });
  const navigate = useNavigate();

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBirthCertificate(file);
    setPreviewURL(URL.createObjectURL(file)); // Generate preview URL for the file
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (next)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add file upload logic and form data submission here

    // Navigate to the next page
    navigate('/education');
  };

  // Handle save button
  const handleSave = () => {
    alert('Information saved successfully!');
    // Add save logic here
  };

  // Handle upload button
  const handleUpload = () => {
    alert('File uploaded successfully!');
    // Add actual upload logic here, like calling an API to upload the file
  };

  // Handle preview button
  const handlePreview = () => {
    if (!previewURL) {
      alert('No file selected to preview.');
      return;
    }
    // Display file in a new window or an image tag
    window.open(previewURL);
  };

  return (
    <div className="demographic-container">
      <h1 className="demographic-title">Demographic Information</h1>
      <form onSubmit={handleSubmit} className="demographic-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthCertificate">Upload Birth Certificate:</label>
          <input
            type="file"
            id="birthCertificate"
            onChange={handleFileChange}
            required
            className="form-input"
          />
        </div>

        {/* File preview */}
        {previewURL && (
          <div className="preview-section">
            <p>Preview:</p>
            <img src={previewURL} alt="Preview" className="preview-image" />
          </div>
        )}

        <div className="form-buttons">
          <button type="button" onClick={handleSave} className="save-button">
            Save
          </button>

          {/* Enable "Upload" and "Preview" buttons only if a file is selected */}
          <button
            type="button"
            onClick={handleUpload}
            className="upload-button"
            disabled={!birthCertificate} // Disabled if no file selected
          >
            Upload File
          </button>

          

          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default DemographicInfo;
