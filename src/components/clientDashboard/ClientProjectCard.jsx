// src/components/clientDashboard/ClientProjectCard.jsx
import React from 'react';
import { FiEye, FiMessageSquare, FiFileText, FiCheckSquare, FiUser } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';

const ClientProjectCard = ({ project, onView, onFeedback, onFiles }) => (
  <div className="cl-project-card">
    <div className="cl-project-header">
      <h6>{project.projectName}</h6>
      <ClientStatusBadge status={project.status} />
    </div>
    <p className="cl-project-desc">{project.description}</p>
    <div className="cl-project-meta">
      <span><FiUser /> {project.manager}</span>
      <span>{project.startDate} - {project.endDate}</span>
    </div>
    <div className="cl-project-progress">
      <div className="cl-progress-label"><span>Progress</span><strong>{project.progress}%</strong></div>
      <div className="progress cl-progress-track"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
    </div>
    <div className="cl-project-stats">
      <span><FiCheckSquare /> {project.completedTasks}/{project.totalTasks} Tasks</span>
      <span className="cl-project-deadline">Deadline: {project.deadline}</span>
    </div>
    <p className="cl-project-update"><strong>Update:</strong> {project.recentUpdate}</p>
    <div className="cl-project-actions">
      <button className="cl-btn" onClick={() => onView(project)}><FiEye /> Details</button>
      <button className="cl-btn" onClick={() => onFeedback(project)}><FiMessageSquare /> Feedback</button>
      <button className="cl-btn" onClick={() => onFiles(project)}><FiFileText /> Files</button>
    </div>
  </div>
);

export default ClientProjectCard;
