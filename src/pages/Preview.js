import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Preview.css'; // Optional: Import CSS for styling

function Preview() {
  const [profileData, setProfileData] = useState({});
  const [demographicInfo, setDemographicInfo] = useState({});
  const [primaryEducation, setPrimaryEducation] = useState([]);
  const [secondaryEducation, setSecondaryEducation] = useState([]);
  const [advancedEducation, setAdvancedEducation] = useState([]);
  const [otherEducation, setOtherEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching profile data
        const profileResponse = await axios.get('http://localhost:8080/profile/{id}'); // Replace {id} with actual user ID
        setProfileData(profileResponse.data);

        // Fetching demographic info
        const demographicResponse = await axios.get('http://localhost:8080/demographic/all');
        setDemographicInfo(demographicResponse.data);

        // Fetching all education levels
        const primaryResponse = await axios.get('http://localhost:8080/primary-education/all');
        setPrimaryEducation(primaryResponse.data);

        const secondaryResponse = await axios.get('http://localhost:8080/secondary-education/all');
        setSecondaryEducation(secondaryResponse.data);

        const advancedResponse = await axios.get('http://localhost:8080/advanced-education/all');
        setAdvancedEducation(advancedResponse.data);

        const otherResponse = await axios.get('http://localhost:8080/other-education/all');
        setOtherEducation(otherResponse.data);

        // Fetching work experience
        const workResponse = await axios.get('http://localhost:8080/work-experience/all');
        setWorkExperience(workResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="preview-container">
      <h1>Preview Your Information</h1>
      
      <h2>Profile Information</h2>
      <div className="profile-info">
        <p><strong>Last Name:</strong> {profileData.lastName}</p>
        <p><strong>First Name:</strong> {profileData.firstName}</p>
        <p><strong>Second Name:</strong> {profileData.secondName}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
        <p><strong>Employment Number:</strong> {profileData.employmentNumber}</p>
        <p><strong>Employment Status:</strong> {profileData.employmentStatus}</p>
        <p><strong>Department:</strong> {profileData.department}</p>
        {profileData.profilePicturePath && (
          <div className="profile-picture">
            <img src={profileData.profilePicturePath} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </div>
        )}
      </div>

      <h2>Demographic Information</h2>
      <div className="demographic-info">
        <p><strong>Name:</strong> {demographicInfo.name}</p>
        <p><strong>Date of Birth:</strong> {demographicInfo.dateOfBirth}</p>
        <p><strong>Address:</strong> {demographicInfo.address}</p>
        <p><strong>Nationality:</strong> {demographicInfo.nationality}</p>
        <p><strong>Gender:</strong> {demographicInfo.gender}</p>
        <p><strong>Phone Number:</strong> {demographicInfo.phoneNumber}</p>
        <p><strong>Email:</strong> {demographicInfo.email}</p>
      </div>

      <h2>Education Levels</h2>

      <h3>Primary Education</h3>
      {primaryEducation.map((edu, index) => (
        <div key={index}>
          <p><strong>School Name:</strong> {edu.school}</p>
          <p><strong>District:</strong> {edu.district}</p>
          <p><strong>Region:</strong> {edu.region}</p>
          <p><strong>Start Year:</strong> {edu.startYear}</p>
          <p><strong>End Year:</strong> {edu.endYear}</p>
        </div>
      ))}

      <h3>Secondary Education</h3>
      {secondaryEducation.map((edu, index) => (
        <div key={index}>
          <p><strong>School Name:</strong> {edu.school}</p>
          <p><strong>District:</strong> {edu.district}</p>
          <p><strong>Region:</strong> {edu.region}</p>
          <p><strong>Start Year:</strong> {edu.startYear}</p>
          <p><strong>End Year:</strong> {edu.endYear}</p>
        </div>
      ))}

      <h3>Advanced Education</h3>
      {advancedEducation.map((edu, index) => (
        <div key={index}>
          <p><strong>Institution Name:</strong> {edu.institutionName}</p>
          <p><strong>Course Type:</strong> {edu.courseType}</p>
          <p><strong>Course Name:</strong> {edu.courseName}</p>
          <p><strong>Start Year:</strong> {edu.startYear}</p>
          <p><strong>End Year:</strong> {edu.endYear}</p>
        </div>
      ))}

      <h3>Other Education</h3>
      {otherEducation.map((edu, index) => (
        <div key={index}>
          <p><strong>Type of Education:</strong> {edu.typeOfEducation}</p>
          <p><strong>Institution Name:</strong> {edu.institutionName}</p>
          <p><strong>Registration Number:</strong> {edu.registrationNumber}</p>
          <p><strong>Start Year:</strong> {edu.startYear}</p>
          <p><strong>End Year:</strong> {edu.endYear}</p>
        </div>
      ))}

      <h2>Work Experience</h2>
      {workExperience.map((work, index) => (
        <div key={index}>
          <p><strong>Company Name:</strong> {work.companyName}</p>
          <p><strong>Position:</strong> {work.position}</p>
          <p><strong>Start Date:</strong> {work.startDate}</p>
          <p><strong>End Date:</strong> {work.endDate}</p>
        </div>
      ))}
    </div>
  );
}

export default Preview;
