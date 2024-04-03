import React, { useState } from 'react';
import './uploadPage/UploadPage.css';
import profilePic from './uploadPage/pfp.png';
import UploadResume from './uploadPage/UploadResume.png';
import banner2Image from './uploadPage/Banner2.png';
import fileIcon from './uploadPage/fileIcon.png';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [profileImage, setProfileImage] = useState(profilePic);
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUploadFiles = (event) => {
    const files = event.target.files;
    if (files.length) {
      const newFileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(currentFiles => [...currentFiles, ...newFileNames]);
    }
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
    setPrompts(currentPrompts => [...currentPrompts, prompt]);
    setPrompt('');
  };

  return (
    <div className="container">
      <div className="header-container">
        {/* Header content can go here */}
      </div>
      <img src={banner2Image} alt="Welcome Banner" className="banner-image" />
      <div className="content-container">
        <div className="tabs-container">
          <div className="tabs">
            <button onClick={() => setActiveTab('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
              Tab 1
            </button>
            <button onClick={() => setActiveTab('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
              Tab 2
            </button>
          </div>
        </div>
        <div className="upload-resume-container">
          {activeTab === 'tab1' && (
            <div className="tab1-content">
              <img src={UploadResume} alt="Upload Resume" className="upload-resume-image" />
              <h2>Upload your resume here</h2>
              <input type="file" id="resume-upload" name="resume" multiple onChange={handleUploadFiles} />
              <button type="button" onClick={() => document.getElementById('resume-upload').click()} style={{backgroundColor: '#3663D9', color: 'white', border: 'none'}}>
                Upload
              </button>
              <div className="uploaded-files-container">
                {uploadedFiles.map((fileName, index) => (
                  <div key={index} className="uploaded-file-item">
                    <img src={fileIcon} alt="File" className="uploaded-file-icon" />
                    <span className="uploaded-file-name">{fileName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'tab2' && (
            <div className="tab-content">
              <h2 style={{fontSize: '64px'}}>Ask a Question</h2>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <input 
                  className = "input-prompt"
                  type="text" 
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter a prompt" 
                />
                <button 
                  onClick={handleSubmit}
                  style={{backgroundColor: '#3663D9', color: 'white', border: 'none'}}
                >
                  Submit
                </button>
              </div>
              <ul>
                {prompts.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="color-square">
          <div className="profile-header">
            <img src={profileImage} alt="Profile" className="profile-pic" />
            <h2 className="account-name">Account Name</h2>
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
            >
              Upload New Profile Picture
            </button>
            <button className="signout" type="button">
              Sign out
            </button>
            <h3>Recent Uploads</h3>
            <div className="Recent-Uploads recent-uploads-container">
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="uploaded-file-name">{fileName}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
