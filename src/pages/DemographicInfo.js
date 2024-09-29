import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DemographicInfo.css'; // Import the CSS file

function DemographicInfo() {
  const [birthCertificate, setBirthCertificate] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [formData, setFormData] = useState({
    id: null,  // Added to track the ID when updating
    name: '',
    dateOfBirth: '',
    address: '',
    nationality: '',
    gender: '',
    phoneNumber: '',
    email: ''
  });
  const [savedData, setSavedData] = useState([]); // State to store the saved demographic data

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

  // Fetch saved demographic data after saving
  const fetchSavedData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/demographic/all'); // Adjust the endpoint if needed
      setSavedData(response.data);
    } catch (error) {
      console.error('Error fetching saved demographic info:', error);
    }
  };

  // Handle form submission (save or update demographic info)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('dateOfBirth', formData.dateOfBirth);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('nationality', formData.nationality);
    formDataToSubmit.append('gender', formData.gender);
    formDataToSubmit.append('phoneNumber', formData.phoneNumber);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('birthCertificate', birthCertificate);

    try {
      if (formData.id) {
        // Update existing demographic info
        await axios.put(`http://localhost:8080/demographic/update/${formData.id}`, formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Demographic Information Updated Successfully');
      } else {
        // Save new demographic info
        await axios.post('http://localhost:8080/demographic/save', formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Demographic Information Saved Successfully');
      }

      fetchSavedData(); // Refresh the saved data
      resetForm(); // Reset the form after saving/updating

    } catch (error) {
      console.error("Error saving the demographic information!", error);
      alert('Failed to save demographic information. Please try again.');
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/demographic/delete/${id}`);
      alert('Demographic Information Deleted');
      fetchSavedData(); // Refresh the saved data
    } catch (error) {
      console.error('Error deleting the demographic info', error);
      alert('Failed to delete demographic information. Please try again.');
    }
  };

  // Handle update functionality (pre-fill form with existing data)
  const handleUpdate = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      dateOfBirth: item.dateOfBirth,
      address: item.address,
      nationality: item.nationality,
      gender: item.gender,
      phoneNumber: item.phoneNumber,
      email: item.email
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      dateOfBirth: '',
      address: '',
      nationality: '',
      gender: '',
      phoneNumber: '',
      email: ''
    });
    setBirthCertificate(null);
    setPreviewURL(null);
  };

  // Fetch saved data on component mount
  useEffect(() => {
    fetchSavedData();
  }, []);

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
          <button type="submit" className="save-button">
            {formData.id ? 'Update' : 'Save'}
          </button>
        </div>
      </form>

      {/* Display saved demographic info */}
      {savedData.length > 0 && (
        <div className="saved-info">
          <h2>Saved Demographic Information</h2>
          <ul>
            {savedData.map((item) => (
              <li key={item.id}>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Date of Birth:</strong> {item.dateOfBirth}</p>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Nationality:</strong> {item.nationality}</p>
                <p><strong>Gender:</strong> {item.gender}</p>
                <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Birth Certificate:</strong> 
                  <a href={`http://localhost:8080/demographic/download/${item.id}`} target="_blank" rel="noopener noreferrer">
                    View Certificate
                  </a>
                </p>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DemographicInfo;
