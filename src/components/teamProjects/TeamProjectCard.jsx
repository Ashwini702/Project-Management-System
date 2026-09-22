// src/components/teamProjects/TeamProjectCard.jsx
import React from 'react';
import { FiEye, FiCheckSquare, FiFileText, FiEdit3, FiUser, FiFolder, FiCalendar } from 'react-icons/fi';
import TeamProjectStatusBadge from './TeamProjectStatusBadge';
import TeamProjectPriorityBadge from './TeamProjectPriorityBadge';
import TeamProjectProgressBar from './TeamProjectProgressBar';

const TeamProjectCard = ({ project, onView, onTasks, onFiles, onUpdate }) => (
  <div className="tp-card">
    <div className="tp-card-header">
      <h6>{project.projectName}</h6>
      <div className="tp-card-badges"><TeamProjectPriorityBadge priority={project.priority} /><TeamProjectStatusBadge status={project.status} /></div>
    </div>
    <p className="tp-card-client">{project.clientName} • {project.category}</p>
    <div className="tp-card-meta">
      <span><FiUser /> {project.managerName}</span>
      <span><FiCalendar /> {project.startDate} - {project.endDate}</span>
    </div>
    <div className="tp-card-progress">
      <div className="tp-progress-label"><span>Project Progress</span><strong>{project.overallProgress}%</strong></div>
      <TeamProjectProgressBar progress={project.overallProgress} />
    </div>
    <div className="tp-card-my-progress">
      <div className="tp-progress-label"><span>My Progress</span><strong>{project.myProgress}%</strong></div>
      <TeamProjectProgressBar progress={project.myProgress} />
    </div>
    <div className="tp-card-stats">
      <span><FiCheckSquare /> My Tasks: {project.completedTasks}/{project.myAssignedTasks}</span>
      <span>Phase: {project.currentPhase}</span>
    </div>
    <p className="tp-card-update"><strong>Update:</strong> {project.recentUpdate}</p>
    <div className="tp-card-actions">
      <button className="tp-btn" onClick={() => onView(project)}><FiEye /> Details</button>
      <button className="tp-btn" onClick={() => onTasks(project)}><FiCheckSquare /> Tasks</button>
      <button className="tp-btn" onClick={() => onFiles(project)}><FiFileText /> Files</button>
      <button className="tp-btn" onClick={() => onUpdate(project)}><FiEdit3 /> Update</button>
    </div>
  </div>
);
export default TeamProjectCard;