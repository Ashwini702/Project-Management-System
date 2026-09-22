// src/components/clientProjects/ClientProjectProgressBox.jsx
import React from 'react';
import { projectProgressData } from '../../data/clientProjectsData';

const ClientProjectProgressBox = ({ projectName }) => {
  const data = projectProgressData.find(p => p.projectName === projectName);
  if (!data) return <p className="text-muted">No progress data available.</p>;

  return (
    <div className="clp-progress-box">
      <h6>Phase-wise Progress</h6>
      <div className="clp-phase-row"><span>Design</span><div className="clp-phase-bar-wrap"><div className="clp-phase-bar" style={{ width: `${data.design}%`, background: 'var(--success-color)' }}></div></div><strong>{data.design}%</strong></div>
      <div className="clp-phase-row"><span>Development</span><div className="clp-phase-bar-wrap"><div className="clp-phase-bar" style={{ width: `${data.development}%`, background: 'var(--primary-color)' }}></div></div><strong>{data.development}%</strong></div>
      <div className="clp-phase-row"><span>Testing</span><div className="clp-phase-bar-wrap"><div className="clp-phase-bar" style={{ width: `${data.testing}%`, background: 'var(--warning-color)' }}></div></div><strong>{data.testing}%</strong></div>
      <div className="clp-phase-row"><span>Deployment</span><div className="clp-phase-bar-wrap"><div className="clp-phase-bar" style={{ width: `${data.deployment}%`, background: 'var(--danger-color)' }}></div></div><strong>{data.deployment}%</strong></div>
    </div>
  );
};
export default ClientProjectProgressBox;