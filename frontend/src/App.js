import React, { useState } from 'react';
import Navbar from './navbar.js';
import DisplayContent from './displayContent.js';

const App = () => {
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'

  // Update active section
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  
  return (
    <div className="container-flex" style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 180px' }}>
        <Navbar onSectionChange={handleSectionChange}/> {/* Sidebar navbar on the left */}
      </div>
      <div style={{ flex: '1', padding: '20px' }}>
        <DisplayContent activeSection={activeSection} onSectionChange={handleSectionChange}/> {/* Main content on the right */}
      </div>
    </div>
  );
};

export default App;
