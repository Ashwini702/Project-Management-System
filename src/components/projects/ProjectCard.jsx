// src/components/projects/ProjectCard.jsx
import React from 'react';
import { FiUsers, FiCheckSquare, FiFileText, FiEye, FiTrash2 } from 'react-icons/fi';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectPriorityBadge from './ProjectPriorityBadge';

const ProjectCard = ({ project, onView, onDelete }) => {
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'var(--success-color)';
    if (progress >= 50) return 'var(--primary-color)';
    if (progress >= 25) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-category-badge">{project.category}</div>
        <div className="project-card-actions">
          <button className="pca-btn" onClick={() => onView(project)} title="View">
            <FiEye />
          </button>
          <button className="pca-btn" onClick={() => onDelete(project)} title="Delete">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="project-card-body">
        <h5 className="project-card-title">{project.title}</h5>
        <p className="project-card-desc">{project.description}</p>

        <div className="project-card-meta">
          <div className="meta-item">
            <span className="meta-label">Client</span>
            <span className="meta-value">{project.client}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Manager</span>
            <span className="meta-value">{project.manager}</span>
          </div>
        </div>

        <div className="project-card-dates">
          <div className="date-item">
            <span className="date-label">Start</span>
            <span className="date-value">{project.startDate}</span>
          </div>
          <div className="date-divider">→</div>
          <div className="date-item">
            <span className="date-label">End</span>
            <span className="date-value">{project.endDate}</span>
          </div>
        </div>

        <div className="project-card-badges">
          <ProjectPriorityBadge priority={project.priority} />
          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="project-progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percent">{project.progress}%</span>
          </div>
          <div className="progress project-progress-bar">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ 
                width: `${project.progress}%`,
                backgroundColor: getProgressColor(project.progress)
              }}
            ></div>
          </div>
        </div>

        <div className="project-card-stats">
          <div className="card-stat">
            <FiUsers className="card-stat-icon" />
            <span>{project.teamMembers.length} Members</span>
          </div>
          <div className="card-stat">
            <FiCheckSquare className="card-stat-icon" />
            <span>{project.totalTasks} Tasks</span>
          </div>
          <div className="card-stat">
            <FiFileText className="card-stat-icon" />
            <span>{project.documentsCount} Docs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
