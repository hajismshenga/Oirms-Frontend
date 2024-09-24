import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Preview.css'; // Make sure to create this CSS file for styling

function Preview() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract state passed from previous pages
  const { demographicInfo, educationData, extraExperiences } = location.state || {};

  const handleSubmit = () => {
    // Add any final submission logic here
    alert('Information submitted successfully!');
    navigate('/'); // Redirect to Dashboard or another page
  };

  const handleUpdate = () => {
    // Logic for updating information (e.g., navigate to edit form)
    alert('Redirecting to update form...');
    navigate('/update'); // Replace with the actual update route
  };

  const handleDownload = () => {
    // Logic for downloading the information
    alert('Downloading your information...');
    // Implement actual download logic (e.g., generate a PDF)
  };

  const handleDelete = () => {
    // Logic for deleting the information
    alert('Information deleted successfully!');
    navigate('/'); // Redirect to another page after deletion
  };

  return (
    <div className="preview-container">
      <h1>Preview Your Information</h1>

      <section>
        <h2>Demographic Information</h2>
        {demographicInfo ? (
          <div>
            <p><strong>Birth Certificate:</strong> {demographicInfo.birthCertificateName}</p>
            {/* Display other demographic info here */}
          </div>
        ) : (
          <p>No demographic information available.</p>
        )}
      </section>

      <section>
        <h2>Education Information</h2>
        {educationData ? (
          <div>
            <p><strong>Institution Name:</strong> {educationData.institutionName}</p>
            <p><strong>Graduation Year:</strong> {educationData.graduationYear}</p>
            <p><strong>Degree:</strong> {educationData.degree}</p>
            <p><strong>School of Form 4:</strong> {educationData.schoolForm4}</p>
            <p><strong>School of Form 6:</strong> {educationData.schoolForm6}</p>
            {/* Display file names or links for uploaded files */}
            <p><strong>Form 4 Certificate:</strong> {educationData.form4Name}</p>
            <p><strong>Form 6 Certificate:</strong> {educationData.form6Name}</p>
            <p><strong>University Certificate:</strong> {educationData.universityName}</p>
          </div>
        ) : (
          <p>No education information available.</p>
        )}
      </section>

      <section>
        <h2>Extra Experiences</h2>
        {extraExperiences ? (
          <div>
            <p><strong>Title:</strong> {extraExperiences.title}</p>
            <p><strong>Description:</strong> {extraExperiences.description}</p>
            <p><strong>Organization:</strong> {extraExperiences.organization}</p>
            <p><strong>Date:</strong> {extraExperiences.date}</p>
            {/* Display file names or links for uploaded certificates */}
            <p><strong>Certificates:</strong></p>
            <ul>
              {extraExperiences.certificates.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No extra experiences available.</p>
        )}
      </section>

      <div className="button-container">
        <button className="button" onClick={handleUpdate}>Update</button>
        <button className="button" onClick={handleDownload}>Download</button>
        <button className="button" onClick={handleDelete}>Delete</button>
        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Preview;
