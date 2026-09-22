// src/components/projectDetails/ProjectOverviewCard.jsx
import React from 'react';
import { FiUsers, FiCheckSquare, FiClock, FiFileText, FiCalendar } from 'react-icons/fi';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectPriorityBadge from './ProjectPriorityBadge';

const ProjectOverviewCard = ({ project }) => (
  <div className="pd-overview-card">
    <div className="pd-overview-header">
      <div>
        <h3>{project.name}</h3>
        <div className="pd-overview-meta">
          <span>Client: {project.client}</span>
          <span>Manager: {project.manager}</span>
          <span><FiCalendar /> {project.startDate} - {project.endDate}</span>
        </div>
        <div className="pd-overview-badges">
          <ProjectStatusBadge status={project.status} />
          <ProjectPriorityBadge priority={project.priority} />
          <span className="pd-category-badge">{project.category}</span>
        </div>
      </div>
    </div>
    <p className="pd-overview-desc">{project.description}</p>
    <div className="pd-overview-progress">
      <div className="progress-label"><span>Overall Progress</span><strong>{project.progress}%</strong></div>
      <div className="progress pd-progress"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
    </div>
    <div className="pd-overview-stats">
      <div className="pd-ostat"><FiCheckSquare /><span>{project.totalTasks}</span><small>Tasks</small></div>
      <div className="pd-ostat"><FiCheckCircle /><span>{project.completedTasks}</span><small>Done</small></div>
      <div className="pd-ostat"><FiClock /><span>{project.pendingTasks}</span><small>Pending</small></div>
      <div className="pd-ostat"><FiUsers /><span>{project.teamCount}</span><small>Team</small></div>
      <div className="pd-ostat"><FiFileText /><span>{project.documentsCount}</span><small>Docs</small></div>
    </div>
  </div>
);

export default ProjectOverviewCard;