// src/components/managerWorkload/WorkloadProgressBar.jsx
import React from 'react';
const WorkloadProgressBar = ({ workload }) => {
  const getColor = () => {
    if (workload >= 91) return 'var(--danger-color)';
    if (workload >= 71) return 'var(--warning-color)';
    if (workload >= 41) return 'var(--primary-color)';
    return 'var(--success-color)';
  };
  const getLabel = () => {
    if (workload >= 91) return 'Overloaded';
    if (workload >= 71) return 'High';
    if (workload >= 41) return 'Medium';
    return 'Low';
  };
  return (
    <div className="mwl-progress-wrapper">
      <div className="mwl-progress-label"><span>Workload</span><span style={{ color: getColor() }}>{workload}% ({getLabel()})</span></div>
      <div className="progress mwl-progress"><div className="progress-bar" style={{ width: `${workload}%`, backgroundColor: getColor() }}></div></div>
    </div>
  );
};
export default WorkloadProgressBar;