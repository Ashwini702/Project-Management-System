// src/components/teamProjects/TeamProjectProgressBar.jsx
import React from 'react';
const TeamProjectProgressBar = ({ progress }) => {
  const getColor = () => { if (progress >= 100) return 'var(--success-color)'; if (progress >= 71) return 'var(--primary-color)'; if (progress >= 31) return 'var(--warning-color)'; return 'var(--danger-color)'; };
  return <div className="progress tp-progress"><div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div></div>;
};
export default TeamProjectProgressBar;