// src/components/taskDetails/TaskProgressSummary.jsx
import React from 'react';

const TaskProgressSummary = () => {
  const phases = [
    { label: 'Design Work', progress: 85, color: 'var(--success-color)' },
    { label: 'Review', progress: 60, color: 'var(--warning-color)' },
    { label: 'Document Upload', progress: 45, color: 'var(--primary-color)' },
    { label: 'Client Approval', progress: 20, color: 'var(--danger-color)' }
  ];
  return (
    <div className="td-progress-summary">
      <h6>Work Breakdown Progress</h6>
      {phases.map(p => (
        <div key={p.label} className="td-phase-row">
          <div className="phase-label">{p.label}</div>
          <div className="phase-bar-wrapper"><div className="phase-bar" style={{ width: `${p.progress}%`, backgroundColor: p.color }}></div></div>
          <span className="phase-percent">{p.progress}%</span>
        </div>
      ))}
    </div>
  );
};

export default TaskProgressSummary;