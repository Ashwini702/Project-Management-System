// src/layouts/ManagerLayout.jsx
import React, { useState } from 'react';
import ManagerSidebar from '../components/managerPanel/ManagerSidebar';
import ManagerNavbar from '../components/managerPanel/ManagerNavbar';

const ManagerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="mgr-layout">
      <ManagerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="mgr-main-wrapper">
        <ManagerNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="mgr-main-content">
          <div className="mgr-content-container">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;