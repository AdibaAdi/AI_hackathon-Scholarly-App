import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './pages/loginUI/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Login from './pages/loginUI/Login'; // Import the Login component

function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ReactDOM.createRoot method for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);