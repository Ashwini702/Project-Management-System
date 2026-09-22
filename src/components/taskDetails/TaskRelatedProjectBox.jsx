// src/components/taskDetails/TaskRelatedProjectBox.jsx
import React from 'react';
import { FiFolder, FiUser, FiUsers, FiCheckSquare, FiCalendar, FiTrendingUp } from 'react-icons/fi';

const TaskRelatedProjectBox = ({ project, onAlert }) => (
  <div className="td-related-project">
    <div className="td-related-header">
      <h5><FiFolder /> {project.name}</h5>
      <button className="btn btn-outline-primary btn-sm" onClick={() => onAlert('View Project Details is frontend demo only.')}>View Project</button>
    </div>
    <div className="td-related-grid">
      <div><FiUser /><span>Client:</span><strong>{project.client}</strong></div>
      <div><FiUser /><span>Manager:</span><strong>{project.manager}</strong></div>
      <div><FiCalendar /><span>Timeline:</span><strong>{project.startDate} - {project.endDate}</strong></div>
      <div><FiTrendingUp /><span>Progress:</span><strong>{project.progress}%</strong></div>
      <div><FiCheckSquare /><span>Tasks:</span><strong>{project.completedTasks}/{project.totalTasks}</strong></div>
      <div><FiUsers /><span>Team:</span><strong>{project.teamCount} members</strong></div>
    </div>
    <div className="progress td-related-progress mt-3"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
  </div>
);

export default TaskRelatedProjectBox;