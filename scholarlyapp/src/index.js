import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The component name here must match the import above */}
        <Route path="UploadPage" element={<UploadPage />} />
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
