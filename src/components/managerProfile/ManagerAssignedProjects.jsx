// src/components/managerProfile/ManagerAssignedProjects.jsx
import React from 'react';
import { FiEye, FiList } from 'react-icons/fi';

const ManagerAssignedProjects = ({ projects, onAlert }) => (
  <div className="mp-projects-grid">
    {projects.map(p => (
      <div key={p.id} className="mp-project-card">
        <h6>{p.projectName}</h6>
        <span className="mp-proj-client">{p.clientName} • {p.category}</span>
        <div className="mp-proj-dates">{p.startDate} - {p.endDate}</div>
        <div className="mp-proj-progress">
          <div className="mp-progress-label"><span>Progress</span><strong>{p.progress}%</strong></div>
          <div className="progress mp-progress"><div className="progress-bar" style={{ width: `${p.progress}%` }}></div></div>
        </div>
        <div className="mp-proj-stats">
          <span>Tasks: {p.completedTasks}/{p.totalTasks}</span>
          <span>Team: {p.teamSize}</span>
        </div>
        <div className="mp-proj-actions">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View Project is frontend demo.')}><FiEye /> View</button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View Tasks is frontend demo.')}><FiList /> Tasks</button>
        </div>
      </div>
    ))}
  </div>
);
export default ManagerAssignedProjects;