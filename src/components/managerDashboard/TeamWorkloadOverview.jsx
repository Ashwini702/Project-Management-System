// src/components/managerDashboard/TeamWorkloadOverview.jsx
import React from 'react';

const TeamWorkloadOverview = ({ team }) => (
  <div>
    <h6>Team Workload</h6>
    <div className="mgr-workload-grid">
      {team.map(m => (
        <div key={m.id} className={`mgr-workload-card ${m.availability === 'Overloaded' ? 'overloaded' : ''}`}>
          <div className="mgr-wl-header">
            <div className="mgr-wl-avatar">{m.avatar}</div>
            <div className="mgr-wl-info"><strong>{m.name}</strong><span>{m.role}</span></div>
            <span className={`mgr-wl-status ${m.availability.toLowerCase()}`}>{m.availability}</span>
          </div>
          <div className="mgr-wl-stats">
            <span>Projects: {m.assignedProjects}</span><span>Tasks: {m.completedTasks}/{m.assignedTasks}</span><span>Pending: {m.pendingTasks}</span>
          </div>
          <div className="mgr-wl-progress">
            <div className="mgr-progress-label"><span>Workload</span><strong>{m.workload}%</strong></div>
            <div className="progress mgr-progress"><div className="progress-bar" style={{ width: `${m.workload}%`, backgroundColor: m.workload >= 90 ? 'var(--danger-color)' : m.workload >= 70 ? 'var(--warning-color)' : 'var(--primary-color)' }}></div></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default TeamWorkloadOverview;