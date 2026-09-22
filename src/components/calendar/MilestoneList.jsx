// src/components/calendar/MilestoneList.jsx
import React from 'react';

const MilestoneList = ({ milestones }) => {
  const getStatusColor = (status) => {
    if (status === 'Completed') return 'var(--success-color)';
    if (status === 'In Progress') return 'var(--primary-color)';
    return 'var(--warning-color)';
  };
  return (
    <div className="milestone-list-card">
      <h6 className="section-title">Project Milestones</h6>
      {milestones.map(m => (
        <div key={m.id} className="milestone-item">
          <div className="milestone-header">
            <h6>{m.title}</h6>
            <span className="milestone-status" style={{ color: getStatusColor(m.status) }}>{m.status}</span>
          </div>
          <span className="milestone-project">{m.project} • {m.date}</span>
          <div className="progress milestone-progress"><div className="progress-bar" style={{ width: `${m.progress}%`, backgroundColor: getStatusColor(m.status) }}></div></div>
          <span className="milestone-progress-text">{m.progress}%</span>
        </div>
      ))}
    </div>
  );
};

export default MilestoneList;