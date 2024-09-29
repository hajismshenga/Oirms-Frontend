import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PrimaryEducation() {
  const [educationDetails, setEducationDetails] = useState({
    id: null, // Track the ID for updates
    school: '',
    district: '',
    region: '',
    startYear: '',
    endYear: '',
  });
  const [educations, setEducations] = useState([]); // State to hold multiple education entries

  // Fetch saved primary education records on component mount
  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/primary-education/all'); // Fetch saved records from API
      setEducations(response.data); // Store fetched records in state
    } catch (error) {
      console.error('Error fetching primary education records:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails({ ...educationDetails, [name]: value });
  };

  const handleSave = async () => {
    if (!educationDetails.school || !educationDetails.district || !educationDetails.region || !educationDetails.startYear || !educationDetails.endYear) {
      alert('Please fill out all required fields for Primary Education.');
    } else {
      try {
        if (educationDetails.id) {
          // Update existing entry
          await axios.put(`http://localhost:8080/primary-education/update/${educationDetails.id}`, educationDetails);
          alert('Primary Education details updated successfully.');
        } else {
          // Save new entry
          await axios.post('http://localhost:8080/primary-education/save', educationDetails);
          alert('Primary Education details saved successfully.');
        }
        fetchEducations(); // Refresh the saved data
        resetForm(); // Reset form after saving/updating
      } catch (error) {
        console.error('Error saving primary education:', error);
        alert('Failed to save primary education details. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/primary-education/delete/${id}`);
      alert('Primary Education details deleted successfully.');
      fetchEducations(); // Refresh the saved data
    } catch (error) {
      console.error('Error deleting primary education:', error);
      alert('Failed to delete primary education details. Please try again.');
    }
  };

  const handleUpdate = (item) => {
    setEducationDetails({
      id: item.id,
      school: item.school,
      district: item.district,
      region: item.region,
      startYear: item.startYear,
      endYear: item.endYear,
    });
  };

  const resetForm = () => {
    setEducationDetails({
      id: null,
      school: '',
      district: '',
      region: '',
      startYear: '',
      endYear: '',
    });
  };

  return (
    <div className="education-form">
      <h1>Primary Education</h1>
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

        <div className="form-buttons">
          <button type="button" onClick={handleSave} className="save-button">
            {educationDetails.id ? 'Update' : 'Save Primary Education'}
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
              <button onClick={() => handleUpdate(edu)}>Update</button>
              <button onClick={() => handleDelete(edu.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PrimaryEducation;
