import React from 'react';
import './uploadPage/UploadPage.css';

const uploadPage = () => {
  return (
    <div className="upload-container">
      <div className="headerTitle1">
        <h1>Welcome to Scholarly</h1>
        <p className = "headerTitle2">Your ultimate Scholarship finding tool!</p>
      </div>
      <div className="upload-section">
        <label htmlFor="resume-upload">Upload your Resume for scholarship Match</label>
        <input type="file" id="resume-upload" name="resume" />
        <button type="button">Upload</button>
      </div>
    </div>
  );
};

export default uploadPage;
