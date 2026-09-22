// src/components/projects/ProjectTable.jsx
import React from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectPriorityBadge from './ProjectPriorityBadge';

const ProjectTable = ({ projects, onView, onDelete }) => {
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'var(--success-color)';
    if (progress >= 50) return 'var(--primary-color)';
    if (progress >= 25) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="table-responsive">
      <table className="table projects-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client</th>
            <th>Category</th>
            <th>Manager</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center py-5">
                <p className="text-muted mb-0">No projects found</p>
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="project-name-cell">
                    <div className="project-avatar-sm">
                      {project.title.charAt(0)}
                    </div>
                    <div>
                      <span className="project-name-text">{project.title}</span>
                      <small className="d-block text-muted">{project.category}</small>
                    </div>
                  </div>
                </td>
                <td>{project.client}</td>
                <td>{project.category}</td>
                <td>{project.manager}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <ProjectPriorityBadge priority={project.priority} />
                </td>
                <td>
                  <ProjectStatusBadge status={project.status} />
                </td>
                <td>
                  <div className="table-progress-wrapper">
                    <div className="progress table-progress">
                      <div
                        className="progress-bar"
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: getProgressColor(project.progress)
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn-icon view-btn" onClick={() => onView(project)} title="View">
                      <FiEye />
                    </button>
                    <button className="action-btn-icon delete-btn" onClick={() => onDelete(project)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
