import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EducationForm.css'; // Import the CSS file

function EducationForm() {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState('');
  const [selectedHigherEducationLevel, setSelectedHigherEducationLevel] = useState('');
  const [educationData, setEducationData] = useState({
    primaryRegion: '',
    primaryDistrict: '',
    primaryStartYear: '',
    primaryEndYear: '',
    primaryCertificate: null,
    secondaryRegion: '',
    secondaryDistrict: '',
    secondaryStartYear: '',
    secondaryEndYear: '',
    form4Index: '',
    form6School: '',
    form6Index: '',
    form6Certificate: null,
    diplomaRegNo: '',
    diplomaSchool: '',
    diplomaStartYear: '',
    diplomaEndYear: '',
    diplomaRegNo: '',
    diplomaCertificate: null,
    degreeSchool: '',
    degreeGraduationYear: '',
    degreeRegNo: '',
    degreeCertificate: null,
    masterSchool: '',
    masterGraduationYear: '',
    masterRegNo: '',
    masterCertificate: null,
    phdSchool: '',
    phdGraduationYear: '',
    phdRegNo: '',
    phdCertificate: null,
    otherEducationLevel: '',
    otherSchool: '',
    otherGraduationYear: '',
    otherRegNo: '',
    otherCertificate: null,
  });
  const [filePreviews, setFilePreviews] = useState({});

  const navigate = useNavigate();

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setEducationData((prevData) => ({
        ...prevData,
        [key]: file,
      }));
      const url = URL.createObjectURL(file);
      setFilePreviews((prevPreviews) => ({
        ...prevPreviews,
        [key]: url,
      }));
    }
  };

  const handleFileDelete = (key) => {
    setEducationData((prevData) => ({
      ...prevData,
      [key]: null,
    }));
    setFilePreviews((prevPreviews) => ({
      ...prevPreviews,
      [key]: '',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEducationLevelChange = (e) => {
    setSelectedEducationLevel(e.target.value);
  };

  const handleHigherEducationLevelChange = (e) => {
    setSelectedHigherEducationLevel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic, such as sending the data to an API or server
    alert('Form submitted successfully!');
    navigate('/academic');
  };

  const handleSave = () => {
    // Add save logic, such as saving to local storage or temporary backend
    alert('Information saved successfully!');
  };

  return (
    <div className="education-container">
      <h1 className="education-title">Education Form</h1>
      <form onSubmit={handleSubmit} className="education-form">

        {/* Primary Level Education */}
        <h2>Primary Level Education</h2>
        <div className="form-group">
          <label htmlFor="primaryRegion">Region of School:</label>
          <input
            type="text"
            id="primaryRegion"
            name="primaryRegion"
            value={educationData.primaryRegion}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="primaryDistrict">District of School:</label>
          <input
            type="text"
            id="primaryDistrict"
            name="primaryDistrict"
            value={educationData.primaryDistrict}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="primaryStartYear">Year of Starting:</label>
          <input
            type="number"
            id="primaryStartYear"
            name="primaryStartYear"
            value={educationData.primaryStartYear}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="primaryEndYear">Year of Ending:</label>
          <input
            type="number"
            id="primaryEndYear"
            name="primaryEndYear"
            value={educationData.primaryEndYear}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Secondary Level Education (Form 4) */}
        <h2>Secondary Level Education (Form 4)</h2>
        <div className="form-group">
          <label htmlFor="secondaryRegion">Region of School:</label>
          <input
            type="text"
            id="secondaryRegion"
            name="secondaryRegion"
            value={educationData.secondaryRegion}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondaryDistrict">District of School:</label>
          <input
            type="text"
            id="secondaryDistrict"
            name="secondaryDistrict"
            value={educationData.secondaryDistrict}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondaryStartYear">Year of Starting:</label>
          <input
            type="number"
            id="secondaryStartYear"
            name="secondaryStartYear"
            value={educationData.secondaryStartYear}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondaryEndYear">Year of Ending:</label>
          <input
            type="number"
            id="secondaryEndYear"
            name="secondaryEndYear"
            value={educationData.secondaryEndYear}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="form4Index">Form 4 Index Number:</label>
          <input
            type="text"
            id="form4Index"
            name="form4Index"
            value={educationData.form4Index}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="form4">Upload Form 4 Certificate:</label>
          <input
            type="file"
            id="form4"
            onChange={(e) => handleFileChange(e, 'primaryCertificate')}
            className="form-input"
          />
          {filePreviews.primaryCertificate && (
            <div className="file-preview">
              <img src={filePreviews.primaryCertificate} alt="File Preview" className="file-preview-image" />
              <button type="button" onClick={() => handleFileDelete('primaryCertificate')} className="delete-button">
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Select Education Level */}
        <h2>Select Education Level</h2>
        <div className="form-group">
          <label htmlFor="educationLevel">Choose Education Level:</label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={selectedEducationLevel}
            onChange={handleEducationLevelChange}
            className="form-input"
          >
            <option value="">Select</option>
            <option value="form6">Form 6</option>
            <option value="diploma">Diploma</option>
          </select>
        </div>

        {selectedEducationLevel === 'form6' && (
          <>
            <h2>Advanced Level Education (Form 6)</h2>
            <div className="form-group">
              <label htmlFor="form6School">School of Form 6:</label>
              <input
                type="text"
                id="form6School"
                name="form6School"
                value={educationData.form6School}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form6Index">Form 6 Index Number:</label>
              <input
                type="text"
                id="form6Index"
                name="form6Index"
                value={educationData.form6Index}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form6">Upload Form 6 Certificate:</label>
              <input
                type="file"
                id="form6"
                onChange={(e) => handleFileChange(e, 'form6Certificate')}
                className="form-input"
              />
              {filePreviews.form6Certificate && (
                <div className="file-preview">
                  <img src={filePreviews.form6Certificate} alt="File Preview" className="file-preview-image" />
                  <button type="button" onClick={() => handleFileDelete('form6Certificate')} className="delete-button">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {selectedEducationLevel === 'diploma' && (
          <>
            <h2>Diploma Level Education</h2>
            <div className="form-group">
              <label htmlFor="diplomaSchool">School of Diploma:</label>
              <input
                type="text"
                id="diplomaSchool"
                name="diplomaSchool"
                value={educationData.diplomaSchool}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="diplomaStartYear">Starting Year:</label>
              <input
                type="number"
                id="diplomaStartYear"
                name="diplomaStartYear"
                value={educationData.diplomaStartYear}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="diplomaEndYear">Ending Year:</label>
              <input
                type="number"
                id="diplomaEndYear"
                name="diplomaEndYear"
                value={educationData.diplomaEndYear}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="diplomaRegNo">Diploma Registration Number:</label>
              <input
                type="text"
                id="diplomaRegNo"
                name="diplomaRegNo"
                value={educationData.diplomaRegNo}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="diploma">Upload Diploma Certificate:</label>
              <input
                type="file"
                id="diploma"
                onChange={(e) => handleFileChange(e, 'diplomaCertificate')}
                className="form-input"
              />
              {filePreviews.diplomaCertificate && (
                <div className="file-preview">
                  <img src={filePreviews.diplomaCertificate} alt="File Preview" className="file-preview-image" />
                  <button type="button" onClick={() => handleFileDelete('diplomaCertificate')} className="delete-button">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Higher Education Section */}
        <h2>Higher Education</h2>
        <div className="form-group">
          <label htmlFor="higherEducationLevel">Choose Higher Education Level:</label>
          <select
            id="higherEducationLevel"
            name="higherEducationLevel"
            value={selectedHigherEducationLevel}
            onChange={handleHigherEducationLevelChange}
            className="form-input"
          >
            <option value="">Select</option>
            <option value="degree">Degree</option>
            <option value="masters">Master's</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        {selectedHigherEducationLevel === 'degree' && (
          <>
            <h2>Degree Level</h2>
            <div className="form-group">
              <label htmlFor="degreeSchool">School of Degree:</label>
              <input
                type="text"
                id="degreeSchool"
                name="degreeSchool"
                value={educationData.degreeSchool}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="degreeRegNo">Degree Registration Number:</label>
              <input
                type="text"
                id="degreeRegNo"
                name="degreeRegNo"
                value={educationData.degreeRegNo}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="degree">Upload Degree Certificate:</label>
              <input
                type="file"
                id="degree"
                onChange={(e) => handleFileChange(e, 'degreeCertificate')}
                className="form-input"
              />
              {filePreviews.degreeCertificate && (
                <div className="file-preview">
                  <img src={filePreviews.degreeCertificate} alt="File Preview" className="file-preview-image" />
                  <button type="button" onClick={() => handleFileDelete('degreeCertificate')} className="delete-button">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="button-group">
          <button type="button" onClick={handleSave} className="save-button">
            Save
          </button>
          <button type="submit" className="submit-button">
            Next
          </button>
          <button type="button" className="update-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EducationForm;
