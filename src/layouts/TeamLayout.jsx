// src/layouts/TeamLayout.jsx
import React, { useState } from 'react';
import TeamSidebar from '../components/teamPanel/TeamSidebar';
import TeamNavbar from '../components/teamPanel/TeamNavbar';

const TeamLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="team-layout">
      <TeamSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="team-main-wrapper">
        <TeamNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="team-main-content">
          <div className="team-content-container">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default TeamLayout;