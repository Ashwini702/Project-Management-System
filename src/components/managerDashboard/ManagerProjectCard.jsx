// src/components/managerDashboard/ManagerProjectCard.jsx
import React from 'react';
import { FiEye, FiUserPlus, FiEdit3, FiUsers, FiCheckSquare } from 'react-icons/fi';
import ProjectStatusBadge from './ProjectStatusBadge';

const ManagerProjectCard = ({ project, onView, onAssignTask, onUpdateStatus }) => (
  <div className="mgr-project-card">
    <div className="mgr-proj-header">
      <h6>{project.projectName}</h6>
      <ProjectStatusBadge status={project.status} />
    </div>
    <p className="mgr-proj-client">{project.clientName} • {project.category}</p>
    <div className="mgr-proj-dates">{project.startDate} - {project.endDate}</div>
    <div className="mgr-proj-progress">
      <div className="mgr-progress-label"><span>Progress</span><strong>{project.progress}%</strong></div>
      <div className="progress mgr-progress"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
    </div>
    <div className="mgr-proj-stats">
      <span><FiCheckSquare /> {project.completedTasks}/{project.totalTasks} Tasks</span>
      <span><FiUsers /> {project.teamCount} Members</span>
    </div>
    <div className="mgr-proj-actions">
      <button className="mgr-btn" onClick={() => onView(project)}><FiEye /> View</button>
      <button className="mgr-btn" onClick={() => onAssignTask(project)}><FiUserPlus /> Assign Task</button>
      <button className="mgr-btn" onClick={() => onUpdateStatus(project)}><FiEdit3 /> Status</button>
    </div>
  </div>
);
export default ManagerProjectCard;