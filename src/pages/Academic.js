import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Academic() {
  const [passportPhoto, setPassportPhoto] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPassportPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add file upload logic here
    navigate('/extra'); // Redirect to the next page
  };

  return (
    <div>
      <h1>Academic Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Passport Size Photo:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default Academic;
