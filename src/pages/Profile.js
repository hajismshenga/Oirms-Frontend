import React, { useState, useEffect } from 'react';
import './Profile.css'; // Optional: Import CSS for styling

function Profile() {
  const [profileData, setProfileData] = useState({
    lastName: '',
    firstName: '',
    secondName: '',
    email: '',
    phoneNumber: '',
    employmentNumber: '',
    employmentStatus: '',
    department: '',
    profilePicture: null,
  });

  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  // Fetch profile data from the server on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch('http://localhost:8080/profile');
      const data = await response.json();
      setProfileData(data);
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePicture: file });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (key === 'profilePicture' && value) {
        formData.append(key, value); // Append the file
      } else {
        formData.append(key, value);
      }
    });

    try {
      await fetch('http://localhost:8080/profile/save', {
        method: 'POST',
        body: formData,
      });
      alert('Profile data submitted successfully!');
      setIsEditing(false); // Disable editing mode after save
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (key === 'profilePicture' && value) {
        formData.append(key, value); // Append the file
      } else {
        formData.append(key, value);
      }
    });

    try {
      await fetch(`http://localhost:8080/profile/update`, {
        method: 'PUT',
        body: formData,
      });
      alert('Profile data updated successfully!');
      setIsEditing(false); // Disable editing mode after update
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Information</h1>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="secondName">Second Name:</label>
            <input type="text" id="secondName" name="secondName" value={profileData.secondName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={profileData.phoneNumber} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="employmentNumber">Employment Number:</label>
            <input type="text" id="employmentNumber" name="employmentNumber" value={profileData.employmentNumber} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="employmentStatus">Employment Status:</label>
            <input type="text" id="employmentStatus" name="employmentStatus" value={profileData.employmentStatus} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department of Work:</label>
            <input type="text" id="department" name="department" value={profileData.department} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Upload Profile Picture:</label>
            <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="form-buttons">
            <button type="button" className="update-button" onClick={handleUpdate}>Update</button>
            <button type="submit" className="submit-button">Save</button>
          </div>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Last Name:</strong> {profileData.lastName}</p>
          <p><strong>First Name:</strong> {profileData.firstName}</p>
          <p><strong>Second Name:</strong> {profileData.secondName}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
          <p><strong>Employment Number:</strong> {profileData.employmentNumber}</p>
          <p><strong>Employment Status:</strong> {profileData.employmentStatus}</p>
          <p><strong>Department:</strong> {profileData.department}</p>
          {profileData.profilePicture && (
            <div className="profile-picture-container">
              <strong>Profile Picture:</strong>
              <img src={URL.createObjectURL(profileData.profilePicture)} alt="Profile" className="profile-picture" />
            </div>
          )}
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
