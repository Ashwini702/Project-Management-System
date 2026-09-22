// src/components/teamAttendance/WorkHoursProgressBar.jsx
import React from 'react';
const WorkHoursProgressBar = ({ hours, max = 8 }) => {
  const pct = Math.min((hours / max) * 100, 100);
  const getColor = () => { if (hours >= 8) return 'var(--success-color)'; if (hours >= 7) return 'var(--primary-color)'; if (hours >= 4) return 'var(--warning-color)'; return 'var(--danger-color)'; };
  return <div className="progress ta-progress"><div className="progress-bar" style={{ width: `${pct}%`, backgroundColor: getColor() }}></div></div>;
};
export default WorkHoursProgressBar;