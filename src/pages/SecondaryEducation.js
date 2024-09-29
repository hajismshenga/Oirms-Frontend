import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SecondaryEducation() {
  const [educationDetails, setEducationDetails] = useState({
    id: null, // Make sure to include the ID
    school: '',
    district: '',
    region: '',
    startYear: '',
    endYear: '',
    indexNumber: '',
    certificate: null,
  });
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/secondary-education/all');
      setEducations(response.data);
    } catch (error) {
      console.error('Error fetching secondary education records:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails({ ...educationDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEducationDetails({ ...educationDetails, certificate: file });
  };

  const handleSave = async () => {
    if (!educationDetails.school || !educationDetails.district || !educationDetails.region || !educationDetails.startYear || !educationDetails.endYear || !educationDetails.indexNumber || !educationDetails.certificate) {
      alert('Please fill out all required fields for Secondary Education.');
    } else {
      const formData = new FormData();
      formData.append('school', educationDetails.school);
      formData.append('district', educationDetails.district);
      formData.append('region', educationDetails.region);
      formData.append('startYear', educationDetails.startYear);
      formData.append('endYear', educationDetails.endYear);
      formData.append('indexNumber', educationDetails.indexNumber);
      formData.append('certificate', educationDetails.certificate);

      try {
        // Save the entry
        await axios.post('http://localhost:8080/secondary-education/save', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Secondary Education details saved successfully.');
        fetchEducations();
        resetForm();
      } catch (error) {
        console.error('Error saving secondary education:', error);
        alert('Failed to save secondary education details. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/secondary-education/delete/${id}`);
      alert('Secondary Education details deleted successfully.');
      fetchEducations();
    } catch (error) {
      console.error('Error deleting secondary education:', error);
      alert('Failed to delete secondary education details. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!educationDetails.id) {
      alert('No education entry selected for updating.');
      return;
    }

    const formData = new FormData();
    formData.append('school', educationDetails.school);
    formData.append('district', educationDetails.district);
    formData.append('region', educationDetails.region);
    formData.append('startYear', educationDetails.startYear);
    formData.append('endYear', educationDetails.endYear);
    formData.append('indexNumber', educationDetails.indexNumber);
    if (educationDetails.certificate) {
      formData.append('certificate', educationDetails.certificate);
    }

    try {
      // Update the entry using its ID
      await axios.put(`http://localhost:8080/secondary-education/update/${educationDetails.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Secondary Education details updated successfully.');
      fetchEducations();
      resetForm();
    } catch (error) {
      console.error('Error updating secondary education:', error);
      alert('Failed to update secondary education details. Please try again.');
    }
  };

  const resetForm = () => {
    setEducationDetails({
      id: null, // Reset ID to null after saving/updating
      school: '',
      district: '',
      region: '',
      startYear: '',
      endYear: '',
      indexNumber: '',
      certificate: null,
    });
    document.getElementById("certificate").value = ""; // Reset file input
  };

  const handleEdit = (edu) => {
    setEducationDetails(edu); // Set the selected education entry for editing
  };

  return (
    <div className="education-form">
      <h1>Secondary Education</h1>
      <form>
        <div className="form-group">
          <label>School Name:</label>
          <input
            type="text"
            name="school"
            value={educationDetails.school}
            onChange={handleInputChange}
            placeholder="Enter school name"
            required
          />
        </div>
        <div className="form-group">
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={educationDetails.district}
            onChange={handleInputChange}
            placeholder="Enter district"
            required
          />
        </div>
        <div className="form-group">
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={educationDetails.region}
            onChange={handleInputChange}
            placeholder="Enter region"
            required
          />
        </div>
        <div className="form-group">
          <label>Start Year:</label>
          <input
            type="number"
            name="startYear"
            value={educationDetails.startYear}
            onChange={handleInputChange}
            placeholder="Enter start year"
            required
          />
        </div>
        <div className="form-group">
          <label>End Year:</label>
          <input
            type="number"
            name="endYear"
            value={educationDetails.endYear}
            onChange={handleInputChange}
            placeholder="Enter end year"
            required
          />
        </div>
        <div className="form-group">
          <label>Index Number:</label>
          <input
            type="text"
            name="indexNumber"
            value={educationDetails.indexNumber}
            onChange={handleInputChange}
            placeholder="Enter index number"
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Certificate:</label>
          <input
            type="file"
            name="certificate"
            id="certificate"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleSave} className="save-button">
            Save Secondary Education
          </button>
          <button type="button" onClick={handleUpdate} className="update-button">
            Update
          </button>
        </div>
      </form>

      {/* Display the saved education entries */}
      <div>
        <h2>Saved Educations</h2>
        <ul>
          {educations.map((edu) => (
            <li key={edu.id}>
              {edu.school} - {edu.district} - {edu.region}
              <button onClick={() => handleEdit(edu)}>Update</button>
              <button onClick={() => handleDelete(edu.id)}>Delete</button>
              {edu.certificatePath && (
                <a href={edu.certificatePath} download>
                  View Certificate
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SecondaryEducation;
