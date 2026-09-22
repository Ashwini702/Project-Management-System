// src/components/projectDetails/ProjectPriorityBadge.jsx
import React from 'react';
const ProjectPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'pd-priority-low', 'Medium': 'pd-priority-medium', 'High': 'pd-priority-high', 'Urgent': 'pd-priority-urgent' };
  return <span className={`pd-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default ProjectPriorityBadge;