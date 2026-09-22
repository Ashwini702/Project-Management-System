// src/components/clientProjects/ClientProjectCard.jsx
import React from 'react';
import { FiEye, FiFileText, FiMessageSquare, FiSend, FiUser, FiCalendar, FiFolder } from 'react-icons/fi';
import ClientProjectStatusBadge from './ClientProjectStatusBadge';
import ClientProjectPriorityBadge from './ClientProjectPriorityBadge';

const ClientProjectCard = ({ project, onView, onFiles, onFeedback, onMessage }) => (
  <div className="clp-card">
    <div className="clp-card-header">
      <h6>{project.projectName}</h6>
      <div className="clp-card-badges"><ClientProjectPriorityBadge priority={project.priority} /><ClientProjectStatusBadge status={project.status} /></div>
    </div>
    <p className="clp-card-desc">{project.description}</p>
    <div className="clp-card-meta">
      <span><FiUser /> {project.managerName}</span>
      <span><FiFolder /> {project.category}</span>
      <span><FiCalendar /> {project.startDate} - {project.endDate}</span>
    </div>
    <div className="clp-card-progress">
      <div className="clp-progress-label"><span>Progress</span><strong>{project.progress}%</strong></div>
      <div className="progress clp-progress"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
    </div>
    <div className="clp-card-phase">
      <span>Phase: {project.currentPhase}</span>
      <span>Deadline: {project.deadline}</span>
    </div>
    <div className="clp-card-stats">
      <span>Tasks: {project.completedTasks}/{project.totalTasks}</span>
      <span>Files: {project.sharedFiles}</span>
    </div>
    <div className="clp-card-update"><strong>Update:</strong> {project.recentUpdate}</div>
    <div className="clp-card-actions">
      <button className="clp-btn" onClick={() => onView(project)}><FiEye /> Details</button>
      <button className="clp-btn" onClick={() => onFiles(project)}><FiFileText /> Files</button>
      <button className="clp-btn" onClick={() => onFeedback(project)}><FiMessageSquare /> Feedback</button>
      <button className="clp-btn" onClick={() => onMessage(project)}><FiSend /> Message</button>
    </div>
  </div>
);
export default ClientProjectCard;