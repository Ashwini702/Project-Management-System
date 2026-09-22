// src/components/projectDetails/ProjectTeamList.jsx
import React from 'react';

const ProjectTeamList = ({ team }) => (
  <div className="pd-team-grid">
    {team.map(m => (
      <div key={m.id} className="pd-team-card">
        <div className="pd-team-avatar">{m.avatar}</div>
        <div className="pd-team-info">
          <h6>{m.name}</h6>
          <span>{m.role}</span>
          <span className="pd-team-dept">{m.department}</span>
        </div>
        <div className="pd-team-contact">
          <span>{m.email}</span>
          <span>{m.phone}</span>
        </div>
        <div className="pd-team-stats">
          <span>Tasks: {m.completedTasks}/{m.assignedTasks}</span>
          <div className="progress pd-team-progress"><div className="progress-bar" style={{ width: `${m.workload}%` }}></div></div>
          <small>Workload: {m.workload}%</small>
        </div>
        <span className={`pd-team-status ${m.status === 'Active' ? 'active' : ''}`}>{m.status}</span>
      </div>
    ))}
  </div>
);

export default ProjectTeamList;