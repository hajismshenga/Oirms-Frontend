import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OtherEducation() {
  const [educationDetails, setEducationDetails] = useState({
    typeOfEducation: '',
    institutionName: '',
    registrationNumber: '',
    startYear: '',
    endYear: '',
    certificate: null,
    certificatePath: '', // To hold the path of the uploaded certificate
  });
  const [educations, setEducations] = useState([]); // State to hold multiple education entries
  const [editingId, setEditingId] = useState(null); // State for editing mode

  // Fetch all saved education records on component mount
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/other-education/all');
        setEducations(response.data);
      } catch (error) {
        console.error('Error fetching education records', error);
      }
    };
    fetchEducations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails({ ...educationDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEducationDetails({ ...educationDetails, certificate: file });
  };

  const handleSave = async () => {
    // Validation
    if (
      !educationDetails.typeOfEducation ||
      !educationDetails.institutionName ||
      !educationDetails.registrationNumber ||
      !educationDetails.startYear ||
      !educationDetails.endYear ||
      !educationDetails.certificate
    ) {
      alert('Please fill out all required fields for Other Education.');
      return;
    }

    const formData = new FormData();
    formData.append('typeOfEducation', educationDetails.typeOfEducation);
    formData.append('institutionName', educationDetails.institutionName);
    formData.append('registrationNumber', educationDetails.registrationNumber);
    formData.append('startYear', educationDetails.startYear);
    formData.append('endYear', educationDetails.endYear);
    formData.append('certificate', educationDetails.certificate);

    try {
      const response = await axios.post('http://localhost:8080/other-education/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEducations([...educations, response.data]); // Update the state with the new entry
      alert('Other Education details saved successfully.');
      resetForm();
    } catch (error) {
      console.error('Error saving education details', error);
      alert('Failed to save education details. Please try again.');
    }
  };

  const handleEdit = (education) => {
    setEducationDetails(education);
    setEditingId(education.id); // Set the ID of the item being edited
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('typeOfEducation', educationDetails.typeOfEducation);
    formData.append('institutionName', educationDetails.institutionName);
    formData.append('registrationNumber', educationDetails.registrationNumber);
    formData.append('startYear', educationDetails.startYear);
    formData.append('endYear', educationDetails.endYear);

    if (educationDetails.certificate) {
      formData.append('certificate', educationDetails.certificate);
    }

    try {
      const response = await axios.put(`http://localhost:8080/other-education/update/${editingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedEducations = educations.map((edu) =>
        edu.id === editingId ? response.data : edu
      );
      setEducations(updatedEducations); // Update the list with the edited entry
      alert('Other Education details updated successfully.');
      resetForm();
    } catch (error) {
      console.error('Error updating education details', error);
      alert('Failed to update education details. Please try again.');
    }
  };

  const resetForm = () => {
    setEducationDetails({
      typeOfEducation: '',
      institutionName: '',
      registrationNumber: '',
      startYear: '',
      endYear: '',
      certificate: null,
      certificatePath: '',
    });
    setEditingId(null); // Reset the editing ID
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/other-education/delete/${id}`);
      setEducations(educations.filter((edu) => edu.id !== id)); // Remove the deleted education from the state
      alert('Education record deleted successfully.');
    } catch (error) {
      console.error('Error deleting education record', error);
      alert('Failed to delete education record. Please try again.');
    }
  };

  return (
    <div className="education-form">
      <h1>Other Education</h1>
      <form>
        <div className="form-group">
          <label htmlFor="typeOfEducation">Type of Education:</label>
          <input
            type="text"
            id="typeOfEducation"
            name="typeOfEducation"
            value={educationDetails.typeOfEducation}
            onChange={handleInputChange}
            placeholder="Enter type of education"
            required
          />
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
          <input
            type="file"
            id="certificate"
            name="certificate"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-buttons">
          {editingId ? (
            <button type="button" onClick={handleUpdate} className="update-button">
              Update Other Education
            </button>
          ) : (
            <button type="button" onClick={handleSave} className="save-button">
              Save Other Education
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
              {edu.typeOfEducation} - {edu.institutionName}
              <button onClick={() => handleEdit(edu)}>Edit</button>
              <button onClick={() => handleDelete(edu.id)}>Delete</button>
              {/* Preview Certificate */}
              {edu.certificatePath && (
                <a href={edu.certificatePath} target="_blank" rel="noopener noreferrer" download>
                  Download Certificate
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OtherEducation;
