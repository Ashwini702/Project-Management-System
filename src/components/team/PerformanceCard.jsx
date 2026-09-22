// src/components/team/PerformanceCard.jsx
import React from 'react';

const PerformanceCard = ({ performer }) => {
  const getPerfLabel = (perf) => {
    if (perf >= 90) return { text: 'Excellent', color: 'var(--success-color)' };
    if (perf >= 75) return { text: 'Good', color: 'var(--primary-color)' };
    if (perf >= 60) return { text: 'Average', color: 'var(--warning-color)' };
    return { text: 'Needs Improvement', color: 'var(--danger-color)' };
  };

  const perf = getPerfLabel(performer.performance);

  return (
    <div className="performance-card">
      <div className="perf-avatar">{performer.avatar}</div>
      <h6 className="perf-name">{performer.name}</h6>
      <span className="perf-role">{performer.role}</span>
      <div className="perf-stats">
        <span>Tasks: {performer.completed}/{performer.tasks}</span>
      </div>
      <div className="progress perf-progress">
        <div className="progress-bar" style={{ width: `${performer.performance}%`, backgroundColor: perf.color }}></div>
      </div>
      <div className="perf-score">
        <span className="perf-value">{performer.performance}%</span>
        <span className="perf-label" style={{ color: perf.color }}>{perf.text}</span>
      </div>
    </div>
  );
};

export default PerformanceCard;