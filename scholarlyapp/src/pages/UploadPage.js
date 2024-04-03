import React, { useState } from 'react';
import './uploadPage/UploadPage.css';
import profilePic from './uploadPage/pfp.png';
import banner2Image from './uploadPage/Banner2.png';

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [profileImage, setProfileImage] = useState(profilePic);
  const [prompt, setPrompt] = useState('');
  const [prompts, setPrompts] = useState([]); // State to keep track of prompts

  const handleUpload = (event) => {
    console.log(event.target.files);
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
    setPrompts(currentPrompts => [...currentPrompts, prompt]); // Add the new prompt to the list
    setPrompt(''); // Clear the input field
  };

  return (
    <div className="container">
      <div className="header-container">
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
            <div className="tab-content">
              <h2 style={{fontSize: '64px'}}>Upload your resume here</h2>
              <input type="file" id="resume-upload" name="resume" onChange={handleUpload} />
              <button type="button" onClick={() => document.getElementById('resume-upload').click()}>
                Upload
              </button>
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
                  placeholder="Enter A prompt" 
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
            <label htmlFor="profile-upload">
              <img src={profileImage} alt="Profile" className="profile-pic" />
            </label>
            <input
              type="file"
              id="profile-upload"
              name="profile"
              style={{ display: 'none' }}
              onChange={handleProfilePicUpload}
              accept="image/*"
            />
            <h2 className="account-name">Account Name</h2>
            <button className="signout" type="button">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;