// src/components/team/WorkloadCard.jsx
import React from 'react';

const WorkloadCard = ({ member }) => {
  const getWorkloadLabel = (wl) => {
    if (wl >= 90) return { text: 'Overloaded', color: 'var(--accent-purple)' };
    if (wl >= 70) return { text: 'High', color: 'var(--danger-color)' };
    if (wl >= 40) return { text: 'Medium', color: 'var(--warning-color)' };
    return { text: 'Low', color: 'var(--success-color)' };
  };

  const wl = getWorkloadLabel(member.workload);

  return (
    <div className="workload-card">
      <div className="workload-header">
        <div className="workload-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
        <div className="workload-info">
          <h6>{member.name}</h6>
          <span>{member.department}</span>
        </div>
        <span className="workload-label" style={{ backgroundColor: wl.color + '20', color: wl.color }}>{wl.text}</span>
      </div>
      <div className="workload-details">
        <div className="wl-item"><span>Projects</span><strong>{member.assignedProjects.length}</strong></div>
        <div className="wl-item"><span>Pending</span><strong>{member.pendingTasks}</strong></div>
        <div className="wl-item"><span>Completed</span><strong>{member.completedTasks}</strong></div>
      </div>
      <div className="progress workload-progress">
        <div className="progress-bar" style={{ width: `${member.workload}%`, backgroundColor: wl.color }}></div>
      </div>
      <span className="workload-percent">{member.workload}% Workload</span>
    </div>
  );
};

export default WorkloadCard;