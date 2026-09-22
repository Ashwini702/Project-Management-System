// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className={`main-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Navbar onMenuClick={toggleSidebar} />
        
        <main className="main-content">
          <div className="content-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
