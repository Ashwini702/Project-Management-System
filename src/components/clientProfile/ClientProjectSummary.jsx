// src/components/clientProfile/ClientProjectSummary.jsx
import React from 'react';
import { FiEye, FiFileText } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';

const ClientProjectSummary = ({ projects, onAlert }) => (
  <div>
    <div className="cprof-project-summary">
      <div className="cprof-ps-card"><h6>Total</h6><h3>{projects.length}</h3></div>
      <div className="cprof-ps-card"><h6>Active</h6><h3 className="text-primary">{projects.filter(p => p.status === 'In Progress').length}</h3></div>
      <div className="cprof-ps-card"><h6>Completed</h6><h3 className="text-success">{projects.filter(p => p.status === 'Completed').length}</h3></div>
      <div className="cprof-ps-card"><h6>Avg Progress</h6><h3>{Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)}%</h3></div>
    </div>
    <h6 className="mt-3">Project List</h6>
    <div className="cprof-projects-grid">
      {projects.map(p => (
        <div key={p.id} className="cprof-project-card">
          <div className="cprof-proj-header">
            <h6>{p.projectName}</h6>
            <ClientStatusBadge status={p.status} />
          </div>
          <span className="cprof-proj-cat">{p.category}</span>
          <div className="cprof-proj-meta">
            <span>{p.startDate} - {p.deadline}</span>
            <span>Manager: {p.projectManager}</span>
          </div>
          <div className="progress cprof-proj-progress"><div className="progress-bar" style={{ width: `${p.progress}%` }}></div></div>
          <div className="cprof-proj-actions">
            <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View Project is demo.')}><FiEye /> View</button>
            <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View Files is demo.')}><FiFileText /> Files</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ClientProjectSummary;