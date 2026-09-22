// src/layouts/ClientLayout.jsx
import React, { useState } from 'react';
import ClientSidebar from '../components/clientPanel/ClientSidebar';
import ClientNavbar from '../components/clientPanel/ClientNavbar';

const ClientLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="client-layout">
      <ClientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="client-main-wrapper">
        <ClientNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="client-main-content">
          <div className="client-content-container">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;