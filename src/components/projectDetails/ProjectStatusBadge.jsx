// src/components/projectDetails/ProjectStatusBadge.jsx
import React from 'react';
const ProjectStatusBadge = ({ status }) => {
  const map = { 'Not Started': 'pd-status-notstarted', 'In Progress': 'pd-status-progress', 'On Hold': 'pd-status-onhold', 'Completed': 'pd-status-completed', 'Cancelled': 'pd-status-cancelled', 'Delayed': 'pd-status-delayed' };
  return <span className={`pd-badge ${map[status] || ''}`}>{status}</span>;
};
export default ProjectStatusBadge;