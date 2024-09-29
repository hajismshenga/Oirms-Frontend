import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdvancedEducation() {
  const [educationDetails, setEducationDetails] = useState({
    institutionName: '',
    registrationNumber: '',
    courseType: '',
    courseName: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [educations, setEducations] = useState([]); // State to hold multiple education entries
  const [editId, setEditId] = useState(null); // State to hold the ID of the education entry to edit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails({ ...educationDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEducationDetails({ ...educationDetails, certificate: file });
  };

  // Fetch all advanced education records
  const fetchEducations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/advanced-education/all');
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching education records:", error);
    }
  };

  // Save advanced education record
  const handleSave = async () => {
    // Validation
    if (
      !educationDetails.institutionName ||
      !educationDetails.registrationNumber ||
      !educationDetails.courseType ||
      !educationDetails.courseName ||
      !educationDetails.startYear ||
      !educationDetails.endYear ||
      !educationDetails.certificate
    ) {
      alert('Please fill out all required fields for Advanced Education.');
      return;
    }

    const formData = new FormData();
    formData.append('institutionName', educationDetails.institutionName);
    formData.append('registrationNumber', educationDetails.registrationNumber);
    formData.append('courseType', educationDetails.courseType);
    formData.append('courseName', educationDetails.courseName);
    formData.append('startYear', educationDetails.startYear);
    formData.append('endYear', educationDetails.endYear);
    formData.append('certificate', educationDetails.certificate);

    try {
      await axios.post('http://localhost:8080/advanced-education/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Advanced Education details saved successfully.');
      fetchEducations(); // Refresh the list of educations
      resetForm(); // Reset the form after saving
    } catch (error) {
      console.error("Error saving advanced education:", error);
      alert('Failed to save advanced education. Please try again.');
    }
  };

  // Handle update
  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append('institutionName', educationDetails.institutionName);
    formData.append('registrationNumber', educationDetails.registrationNumber);
    formData.append('courseType', educationDetails.courseType);
    formData.append('courseName', educationDetails.courseName);
    formData.append('startYear', educationDetails.startYear);
    formData.append('endYear', educationDetails.endYear);
    
    // Append the new certificate if provided
    if (educationDetails.certificate) {
      formData.append('certificate', educationDetails.certificate);
    }

    try {
      await axios.put(`http://localhost:8080/advanced-education/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Advanced Education details updated successfully.');
      fetchEducations(); // Refresh the list of educations
      resetForm(); // Reset the form after updating
    } catch (error) {
      console.error("Error updating advanced education:", error);
      alert('Failed to update advanced education. Please try again.');
    }
  };

  // Reset form
  const resetForm = () => {
    setEducationDetails({
      institutionName: '',
      registrationNumber: '',
      courseType: '',
      courseName: '',
      startYear: '',
      endYear: '',
      certificate: null,
    });
    setEditId(null); // Reset edit ID
  };

  // Handle edit
  const handleEdit = (education) => {
    setEducationDetails(education);
    setEditId(education.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/advanced-education/delete/${id}`);
      alert('Advanced Education details deleted successfully.');
      fetchEducations(); // Refresh the list of educations
    } catch (error) {
      console.error("Error deleting advanced education:", error);
      alert('Failed to delete advanced education. Please try again.');
    }
  };

  // Fetch all educations when component mounts
  useEffect(() => {
    fetchEducations();
  }, []);

  return (
    <div className="education-form">
      <h1>Advanced Education</h1>
      <form>
        {/* Course Type Dropdown */}
        <div className="form-group">
          <label htmlFor="courseType">Course Type:</label>
          <select
            id="courseType"
            name="courseType"
            value={educationDetails.courseType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Course Type</option>
            <option value="Diploma">Diploma</option>
            <option value="Degree">Degree</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="institutionName">Institution Name:</label>
          <input
            type="text"
            id="institutionName"
            name="institutionName"
            value={educationDetails.institutionName}
            onChange={handleInputChange}
            placeholder="Enter institution name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="registrationNumber">Registration Number:</label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={educationDetails.registrationNumber}
            onChange={handleInputChange}
            placeholder="Enter registration number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={educationDetails.courseName}
            onChange={handleInputChange}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startYear">Start Year:</label>
          <input
            type="number"
            id="startYear"
            name="startYear"
            value={educationDetails.startYear}
            onChange={handleInputChange}
            placeholder="Enter start year"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endYear">End Year:</label>
          <input
            type="number"
            id="endYear"
            name="endYear"
            value={educationDetails.endYear}
            onChange={handleInputChange}
            placeholder="Enter end year"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="certificate">Upload Certificate:</label>
          <input type="file" id="certificate" name="certificate" onChange={handleFileChange} required />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleSave} className="save-button">
            Save Advanced Education
          </button>
          {editId && (
            <button type="button" onClick={() => handleUpdate(editId)} className="update-button">
              Update
            </button>
          )}
        </div>
      </form>

      {/* Display the saved education entries */}
      <div>
        <h2>Saved Educations</h2>
        <ul>
          {educations.map((edu) => (
            <li key={edu.id}>
              {edu.courseName} - {edu.institutionName}
              <button onClick={() => handleEdit(edu)}>Edit</button>
              <button onClick={() => handleDelete(edu.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdvancedEducation;
