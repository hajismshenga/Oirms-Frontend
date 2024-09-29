import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './WorkExperience.css';

function WorkExperience() {
  const [workExperience, setWorkExperience] = useState({
    companyName: '',
    position: '',
    startDate: null,
    endDate: null
  });
  const [educations, setEducations] = useState([]); // State to hold multiple work experiences
  const [editingId, setEditingId] = useState(null); // State for managing edit mode

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:8080/work-experience/all');
        setEducations(response.data);
      } catch (error) {
        console.error('Error fetching work experiences', error);
      }
    };
    fetchWorkExperiences();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkExperience({ ...workExperience, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setWorkExperience({ ...workExperience, [name]: date });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:8080/work-experience/save', workExperience);
      setEducations([...educations, response.data]);
      alert('Work experience saved successfully');
      resetForm();
    } catch (error) {
      console.error('Error saving work experience', error);
      alert('Failed to save work experience');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/work-experience/update/${editingId}`, workExperience);
      const updatedWorkExperiences = educations.map((edu) =>
        edu.id === editingId ? response.data : edu
      );
      setEducations(updatedWorkExperiences);
      alert('Work experience updated successfully');
      resetForm();
    } catch (error) {
      console.error('Error updating work experience', error);
      alert('Failed to update work experience');
    }
  };

  const handleEdit = (edu) => {
    setWorkExperience(edu);
    setEditingId(edu.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/work-experience/delete/${id}`);
      setEducations(educations.filter((edu) => edu.id !== id));
      alert('Work experience deleted successfully');
    } catch (error) {
      console.error('Error deleting work experience', error);
      alert('Failed to delete work experience');
    }
  };

  const resetForm = () => {
    setWorkExperience({ companyName: '', position: '', startDate: null, endDate: null });
    setEditingId(null); // Reset the editing ID
  };

  return (
    <div className="work-experience-container">
      <h1>Work Experience</h1>
      <form>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={workExperience.companyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={workExperience.position}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            selected={workExperience.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            selected={workExperience.endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
            dateFormat="yyyy-MM-dd"
            className="date-picker"
            required
          />
        </div>

        <div className="form-buttons">
          {editingId ? (
            <button type="button" onClick={handleUpdate} className="update-button">Update</button>
          ) : (
            <button type="button" onClick={handleSave} className="save-button">Save</button>
          )}
        </div>
      </form>

      <h2>Saved Work Experiences</h2>
      <ul>
        {educations.map((edu) => (
          <li key={edu.id}>
            {edu.companyName} - {edu.position}
            <button onClick={() => handleEdit(edu)}>Edit</button>
            <button onClick={() => handleDelete(edu.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkExperience;
