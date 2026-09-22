// src/components/projectDetails/ProjectProgressSummary.jsx
import React from 'react';

const ProjectProgressSummary = () => {
  const phases = [
    { label: 'Design Phase', progress: 100, color: 'var(--success-color)' },
    { label: 'Development Phase', progress: 75, color: 'var(--primary-color)' },
    { label: 'Testing Phase', progress: 65, color: 'var(--warning-color)' },
    { label: 'Deployment Phase', progress: 20, color: 'var(--danger-color)' }
  ];
  return (
    <div className="pd-progress-summary">
      <h6>Phase Progress</h6>
      {phases.map(p => (
        <div key={p.label} className="pd-phase-row">
          <div className="phase-label">{p.label}</div>
          <div className="phase-bar-wrapper"><div className="phase-bar" style={{ width: `${p.progress}%`, backgroundColor: p.color }}></div></div>
          <span className="phase-percent">{p.progress}%</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectProgressSummary;