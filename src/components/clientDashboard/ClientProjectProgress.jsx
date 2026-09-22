// src/components/clientDashboard/ClientProjectProgress.jsx
import React from 'react';
import ClientStatusBadge from './ClientStatusBadge';

const ClientProjectProgress = ({ data }) => (
  <div className="cl-progress-section">
    <h6>Project Progress Overview</h6>
    {data.map(p => (
      <div key={p.projectName} className="cl-progress-card">
        <div className="cl-progress-card-header">
          <span className="cl-progress-project-name">{p.projectName}</span>
          <ClientStatusBadge status={p.status} />
        </div>
        <div className="cl-phase-row"><span>Design</span><div className="phase-bar-wrap"><div className="phase-bar-fill" style={{ width: `${p.design}%` }}></div></div><strong>{p.design}%</strong></div>
        <div className="cl-phase-row"><span>Development</span><div className="phase-bar-wrap"><div className="phase-bar-fill" style={{ width: `${p.development}%` }}></div></div><strong>{p.development}%</strong></div>
        <div className="cl-phase-row"><span>Testing</span><div className="phase-bar-wrap"><div className="phase-bar-fill" style={{ width: `${p.testing}%` }}></div></div><strong>{p.testing}%</strong></div>
        <div className="cl-phase-row"><span>Deployment</span><div className="phase-bar-wrap"><div className="phase-bar-fill" style={{ width: `${p.deployment}%` }}></div></div><strong>{p.deployment}%</strong></div>
      </div>
    ))}
  </div>
);

export default ClientProjectProgress;
