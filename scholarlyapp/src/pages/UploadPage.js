import React, { useState, useEffect } from 'react';
import './uploadPage/UploadPage.css';
import profilePic from './uploadPage/pfp.png';
import UploadResume from './uploadPage/UploadResume.png';
import banner2Image from './uploadPage/Banner2.png';
import fileIcon from './uploadPage/fileIcon.png';
import IconResume from './uploadPage/IconResume.png';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [profileImage, setProfileImage] = useState(profilePic);
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [userName, setUserName] = useState('');

  // Use useEffect to retrieve and set the user name from localStorage
  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) {
      setUserName(name);
      console.log("Current userName state:", userName);

    } else {
      console.log("user_name not found in localStorage");
    }
  }, []);

  const handleUploadFiles = (event) => {
    const files = event.target.files;
    if (files.length) {
      const newFileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(currentFiles => [...currentFiles, ...newFileNames]);
      setActiveTab('tab2'); // Switch to "See Matches!" tab
    }
    // You might want to include additional logic here for uploading files to the backend
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = () => {
    if (prompt.trim() !== '') {
      setPrompts(currentPrompts => [...currentPrompts, prompt]);
      setPrompt('');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    // Redirect to home or login page
    window.location.href = '/';
  };

  return (
    <div className="container">
      <div className="header-container">
        {/* Header can include navigation or branding */}
      </div>
      <img src={banner2Image} alt="Welcome Banner" className="banner-image" />
      <div className="content-container">
        <div className="tabs-container">
          <div className="tabs">
            <button onClick={() => setActiveTab('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
              Document Upload
            </button>
            <button onClick={() => setActiveTab('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
              See Matches!
            </button>
          </div>
        </div>
        <div className="upload-resume-container">
          {activeTab === 'tab1' && (
            <div className="tab1-content">
              <img src={IconResume} alt="Upload Resume" className="upload-resume-image" />
              <h2>Upload your resume/CV here</h2>
              <input type="file" id="resume-upload" name="resume" multiple onChange={handleUploadFiles} />
              <button type="button" className="upButton" onClick={() => document.getElementById('resume-upload').click()} style={{backgroundColor: '#3663D9', color: 'white', border: 'none'}}>
                Upload
              </button>
            </div>
          )}
          {activeTab === 'tab2' && (
            <div className="tab-content">
              <h2>Your Uploaded Files</h2>
              <div className="uploaded-files-list">
                {uploadedFiles.length > 0 ? uploadedFiles.map((fileName, index) => (
                  <div key={index} className="uploaded-file-item">
                    <img src={fileIcon} alt="File" className="uploaded-file-icon" />
                    <span className="uploaded-file-name">{fileName}</span>
                  </div>
                )) : <p>No files uploaded.</p>}
              </div>
              {/* Additional content for tab2 */}
            </div>
          )}
        </div>
        <div className="color-square">
          <div className="profile-header">
            <img src={profileImage} alt="Profile" className="profile-pic" />
            <h2 className="account-name">{userName}</h2>
            <input
              type="file"
              id="profile-upload"
              name="profile"
              style={{ display: 'none' }}
              onChange={handleProfilePicUpload}
              accept="image/*"
            />
            <button
              className="profile-upload-btn"
              onClick={() => document.getElementById('profile-upload').click()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <img src={UploadResume} alt="Upload" style={{ width: '24px', height: '24px' }} />
              Upload New Profile Picture
            </button>
            <button className="signout" type="button" onClick={handleSignOut}>
              Sign out
            </button>
            <h3>Recent Uploads</h3>
            <div className="uploaded-files-container">
                {uploadedFiles.map((fileName, index) => (
                  <div key={index} className="uploaded-file-item">
                    <img src={fileIcon} alt="File" className="uploaded-file-icon" />
                    <span className="uploaded-file-name">{fileName}</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
