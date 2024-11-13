import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles
import App from './App';  // Main app component
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS

// Get the root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
