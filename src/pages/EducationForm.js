import React, { useState } from 'react';
import './Education.css';

const Education = () => {
  const [primaryDetails, setPrimaryDetails] = useState({
    school: '',
    district: '',
    region: '',
    startYear: '',
    endYear: '',
  });

  const [secondaryDetails, setSecondaryDetails] = useState({
    school: '',
    district: '',
    region: '',
    indexNumber: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [form6Details, setForm6Details] = useState({
    school: '',
    indexNumber: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [diplomaDetails, setDiplomaDetails] = useState({
    registrationNumber: '',
    school: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [degreeDetails, setDegreeDetails] = useState({
    degree: '',
    school: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [masterDetails, setMasterDetails] = useState({
    degree: '',
    school: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [phdDetails, setPhdDetails] = useState({
    degree: '',
    school: '',
    startYear: '',
    endYear: '',
    certificate: null,
  });

  const [selectedEducationLevel, setSelectedEducationLevel] = useState({
    diplomaOrForm6: '',
    degreeOrMasterOrPhD: '',
  });

  const handleInputChange = (e, level) => {
    const { name, value } = e.target;
    switch (level) {
      case 'Primary':
        setPrimaryDetails({ ...primaryDetails, [name]: value });
        break;
      case 'Secondary':
        setSecondaryDetails({ ...secondaryDetails, [name]: value });
        break;
      case 'Form 6':
        setForm6Details({ ...form6Details, [name]: value });
        break;
      case 'Diploma':
        setDiplomaDetails({ ...diplomaDetails, [name]: value });
        break;
      case 'Degree':
        setDegreeDetails({ ...degreeDetails, [name]: value });
        break;
      case 'Master':
        setMasterDetails({ ...masterDetails, [name]: value });
        break;
      case 'PhD':
        setPhdDetails({ ...phdDetails, [name]: value });
        break;
      default:
        break;
    }
  };

  const handleCertificateChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'Secondary') {
      setSecondaryDetails({ ...secondaryDetails, certificate: file });
    } else if (type === 'Form 6') {
      setForm6Details({ ...form6Details, certificate: file });
    } else if (type === 'Diploma') {
      setDiplomaDetails({ ...diplomaDetails, certificate: file });
    } else if (type === 'Degree') {
      setDegreeDetails({ ...degreeDetails, certificate: file });
    } else if (type === 'Master') {
      setMasterDetails({ ...masterDetails, certificate: file });
    } else if (type === 'PhD') {
      setPhdDetails({ ...phdDetails, certificate: file });
    }
  };

  const handleDeleteCertificate = (type) => {
    if (type === 'Secondary') {
      setSecondaryDetails({ ...secondaryDetails, certificate: null });
    } else if (type === 'Form 6') {
      setForm6Details({ ...form6Details, certificate: null });
    } else if (type === 'Diploma') {
      setDiplomaDetails({ ...diplomaDetails, certificate: null });
    } else if (type === 'Degree') {
      setDegreeDetails({ ...degreeDetails, certificate: null });
    } else if (type === 'Master') {
      setMasterDetails({ ...masterDetails, certificate: null });
    } else if (type === 'PhD') {
      setPhdDetails({ ...phdDetails, certificate: null });
    }
  };

  const handleDiplomaOrForm6Change = (e) => {
    setSelectedEducationLevel({ ...selectedEducationLevel, diplomaOrForm6: e.target.value });
  };

  const handleDegreeOrMasterOrPhDChange = (e) => {
    setSelectedEducationLevel({ ...selectedEducationLevel, degreeOrMasterOrPhD: e.target.value });
  };

  const handleSave = () => {
    // Add your save logic here, e.g., API call or state management
    alert('Data saved successfully!');
  };

  const handleNext = () => {
    // Logic to proceed to the next page or component
    alert('Proceeding to the next page...');
  };

  return (
    <div>
      <h2>Education Information</h2>

      <h3>Primary Education</h3>
      <label>School Name:</label>
      <input type="text" name="school" onChange={(e) => handleInputChange(e, 'Primary')} required />
      <label>District:</label>
      <input type="text" name="district" onChange={(e) => handleInputChange(e, 'Primary')} required />
      <label>Region:</label>
      <input type="text" name="region" onChange={(e) => handleInputChange(e, 'Primary')} required />
      <label>Start Year:</label>
      <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'Primary')} required />
      <label>End Year:</label>
      <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'Primary')} required />

      <h3>Secondary Education</h3>
      <label>School Name:</label>
      <input type="text" name="school" onChange={(e) => handleInputChange(e, 'Secondary')} required />
      <label>District:</label>
      <input type="text" name="district" onChange={(e) => handleInputChange(e, 'Secondary')} required />
      <label>Region:</label>
      <input type="text" name="region" onChange={(e) => handleInputChange(e, 'Secondary')} required />
      <label>Index Number:</label>
      <input type="text" name="indexNumber" onChange={(e) => handleInputChange(e, 'Secondary')} required />
      <label>Start Year:</label>
      <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'Secondary')} required />
      <label>End Year:</label>
      <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'Secondary')} required />
      
      <label>Upload Certificate:</label>
      <input type="file" accept="image/*" onChange={(e) => handleCertificateChange(e, 'Secondary')} />
      {secondaryDetails.certificate && (
        <div>
          <h4>Uploaded Certificate:</h4>
          <img 
            src={URL.createObjectURL(secondaryDetails.certificate)} 
            alt="Uploaded Certificate" 
            style={{ width: '100px', height: '100px' }} 
          />
          <button onClick={() => handleDeleteCertificate('Secondary')}>Delete Certificate</button>
        </div>
      )}

      <h3>Form 6 / Diploma</h3>
      <label>Select Education Level:</label>
      <select onChange={handleDiplomaOrForm6Change} value={selectedEducationLevel.diplomaOrForm6}>
        <option value="">Select</option>
        <option value="Form 6">Form 6</option>
        <option value="Diploma">Diploma</option>
      </select>

      {selectedEducationLevel.diplomaOrForm6 === 'Form 6' && (
        <>
          <h4>Form 6 Details</h4>
          <label>School Name:</label>
          <input type="text" name="school" onChange={(e) => handleInputChange(e, 'Form 6')} required />
          <label>Index Number:</label>
          <input type="text" name="indexNumber" onChange={(e) => handleInputChange(e, 'Form 6')} required />
          <label>Start Year:</label>
          <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'Form 6')} required />
          <label>End Year:</label>
          <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'Form 6')} required />

          <label>Upload Certificate:</label>
          <input type="file" accept="image/*" onChange={(e) => handleCertificateChange(e, 'Form 6')} />
          {form6Details.certificate && (
            <div>
              <h4>Uploaded Certificate:</h4>
              <img 
                src={URL.createObjectURL(form6Details.certificate)} 
                alt="Uploaded Certificate" 
                style={{ width: '100px', height: '100px' }} 
              />
              <button onClick={() => handleDeleteCertificate('Form 6')}>Delete Certificate</button>
            </div>
          )}
        </>
      )}

      {selectedEducationLevel.diplomaOrForm6 === 'Diploma' && (
        <>
          <h4>Diploma Details</h4>
          <label>Registration Number:</label>
          <input type="text" name="registrationNumber" onChange={(e) => handleInputChange(e, 'Diploma')} required />
          <label>School Name:</label>
          <input type="text" name="school" onChange={(e) => handleInputChange(e, 'Diploma')} required />
          <label>Start Year:</label>
          <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'Diploma')} required />
          <label>End Year:</label>
          <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'Diploma')} required />

          <label>Upload Certificate:</label>
          <input type="file" accept="image/*" onChange={(e) => handleCertificateChange(e, 'Diploma')} />
          {diplomaDetails.certificate && (
            <div>
              <h4>Uploaded Certificate:</h4>
              <img 
                src={URL.createObjectURL(diplomaDetails.certificate)} 
                alt="Uploaded Certificate" 
                style={{ width: '100px', height: '100px' }} 
              />
              <button onClick={() => handleDeleteCertificate('Diploma')}>Delete Certificate</button>
            </div>
          )}
        </>
      )}

      <h3>Higher Education</h3>
      <label>Select Degree Level:</label>
      <select onChange={handleDegreeOrMasterOrPhDChange} value={selectedEducationLevel.degreeOrMasterOrPhD}>
        <option value="">Select</option>
        <option value="Degree">Degree</option>
        <option value="Master">Master</option>
        <option value="PhD">PhD</option>
      </select>

      {selectedEducationLevel.degreeOrMasterOrPhD === 'Degree' && (
        <>
          <h4>Degree Details</h4>
          <label>Degree:</label>
          <input type="text" name="degree" onChange={(e) => handleInputChange(e, 'Degree')} required />
          <label>School Name:</label>
          <input type="text" name="school" onChange={(e) => handleInputChange(e, 'Degree')} required />
          <label>Start Year:</label>
          <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'Degree')} required />
          <label>End Year:</label>
          <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'Degree')} required />

          <label>Upload Certificate:</label>
          <input type="file" accept="image/*" onChange={(e) => handleCertificateChange(e, 'Degree')} />
          {degreeDetails.certificate && (
            <div>
              <h4>Uploaded Certificate:</h4>
              <img 
                src={URL.createObjectURL(degreeDetails.certificate)} 
                alt="Uploaded Certificate" 
                style={{ width: '100px', height: '100px' }} 
              />
              <button onClick={() => handleDeleteCertificate('Degree')}>Delete Certificate</button>
            </div>
          )}
        </>
      )}

      {selectedEducationLevel.degreeOrMasterOrPhD === 'Master' && (
        <>
          <h4>Master Details</h4>
          <label>Degree:</label>
          <input type="text" name="degree" onChange={(e) => handleInputChange(e, 'Master')} required />
          <label>School Name:</label>
          <input type="text" name="school" onChange={(e) => handleInputChange(e, 'Master')} required />
          <label>Start Year:</label>
          <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'Master')} required />
          <label>End Year:</label>
          <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'Master')} required />

          <label>Upload Certificate:</label>
          <input type="file" accept="image/*" onChange={(e) => handleCertificateChange(e, 'Master')} />
          {masterDetails.certificate && (
            <div>
              <h4>Uploaded Certificate:</h4>
              <img 
                src={URL.createObjectURL(masterDetails.certificate)} 
                alt="Uploaded Certificate" 
                style={{ width: '100px', height: '100px' }} 
              />
              <button onClick={() => handleDeleteCertificate('Master')}>Delete Certificate</button>
            </div>
          )}
        </>
      )}

      {selectedEducationLevel.degreeOrMasterOrPhD === 'PhD' && (
        <>
          <h4>PhD Details</h4>
          <label>Degree:</label>
          <input type="text" name="degree" onChange={(e) => handleInputChange(e, 'PhD')} required />
          <label>School Name:</label>
          <input type="text" name="school" onChange={(e) => handleInputChange(e, 'PhD')} required />
          <label>Start Year:</label>
          <input type="number" name="startYear" onChange={(e) => handleInputChange(e, 'PhD')} required />
          <label>End Year:</label>
          <input type="number" name="endYear" onChange={(e) => handleInputChange(e, 'PhD')} required />

          <label>Upload Certificate:</label>
          <input type="file" accept="image/*" onChange={(e) => handleCertificateChange(e, 'PhD')} />
          {phdDetails.certificate && (
            <div>
              <h4>Uploaded Certificate:</h4>
              <img 
                src={URL.createObjectURL(phdDetails.certificate)} 
                alt="Uploaded Certificate" 
                style={{ width: '100px', height: '100px' }} 
              />
              <button onClick={() => handleDeleteCertificate('PhD')}>Delete Certificate</button>
            </div>
          )}
        </>
      )}

      {/* Save and Next buttons */}
      <div className="button-container">
        <button className="button" onClick={handleSave}>
          Save
        </button>
        <button className="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Education;
