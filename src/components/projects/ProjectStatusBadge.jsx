// src/components/projects/ProjectStatusBadge.jsx
import React from 'react';

const ProjectStatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    const statusMap = {
      'Not Started': 'status-not-started',
      'In Progress': 'status-in-progress',
      'On Hold': 'status-on-hold',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled',
      'Delayed': 'status-delayed'
    };
    return statusMap[status] || 'status-default';
  };

  return (
    <span className={`project-status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default ProjectStatusBadge;
