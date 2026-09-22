// src/components/teamDashboard/MyProjectCard.jsx
import React from 'react';
import { FiEye, FiCheckSquare, FiUser, FiFolder } from 'react-icons/fi';

const MyProjectCard = ({ project, onView }) => (
  <div className="tm-project-card">
    <div className="tm-project-header">
      <h6><FiFolder /> {project.projectName}</h6>
    </div>
    <div className="tm-project-meta">
      <span><FiUser /> {project.clientName}</span><span>Manager: {project.manager}</span>
    </div>
    <div className="tm-project-dates">{project.startDate} - {project.endDate}</div>
    <div className="tm-project-progress">
      <div className="tm-progress-label"><span>Progress</span><strong>{project.progress}%</strong></div>
      <div className="progress tm-progress"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
    </div>
    <div className="tm-project-tasks">
      <span><FiCheckSquare /> {project.completedTasks}/{project.assignedTasks} Tasks ({project.pendingTasks} pending)</span>
    </div>
    <button className="tm-btn w-100" onClick={() => onView(project)}><FiEye /> View Project</button>
  </div>
);
export default MyProjectCard;