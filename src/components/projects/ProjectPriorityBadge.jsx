// src/components/projects/ProjectPriorityBadge.jsx
import React from 'react';

const ProjectPriorityBadge = ({ priority }) => {
  const getPriorityClass = (priority) => {
    const priorityMap = {
      'Low': 'priority-low',
      'Medium': 'priority-medium',
      'High': 'priority-high',
      'Urgent': 'priority-urgent'
    };
    return priorityMap[priority] || 'priority-default';
  };

  return (
    <span className={`project-priority-badge ${getPriorityClass(priority)}`}>
      {priority}
    </span>
  );
};

export default ProjectPriorityBadge;