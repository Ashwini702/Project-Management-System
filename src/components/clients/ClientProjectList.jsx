// src/components/clients/ClientProjectList.jsx
import React from 'react';

const ClientProjectList = ({ projects, assignedProjects }) => {
  const projectDetails = assignedProjects.map((p, i) => ({
    name: p,
    manager: ['Michael Roberts', 'Emily Davidson', 'Patricia Garcia'][i % 3],
    startDate: `2026-0${i+1}-15`,
    endDate: `2026-0${i+3}-30`,
    status: ['In Progress', 'Completed', 'On Hold'][i % 3],
    progress: [75, 100, 45][i % 3]
  }));

  return (
    <div className="client-project-list">
      <h6>Assigned Projects</h6>
      {projectDetails.map((proj, idx) => (
        <div key={idx} className="cpl-item">
          <div className="cpl-header">
            <span className="cpl-name">{proj.name}</span>
            <span className={`cpl-status status-${proj.status.toLowerCase().replace(' ', '-')}`}>{proj.status}</span>
          </div>
          <div className="cpl-meta"><span>Manager: {proj.manager}</span><span>{proj.startDate} - {proj.endDate}</span></div>
          <div className="progress cpl-progress"><div className="progress-bar" style={{ width: `${proj.progress}%`, backgroundColor: proj.progress >= 100 ? 'var(--success-color)' : 'var(--primary-color)' }}></div></div>
          <span className="cpl-progress-text">{proj.progress}%</span>
        </div>
      ))}
    </div>
  );
};

export default ClientProjectList;