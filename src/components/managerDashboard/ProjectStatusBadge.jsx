// src/components/managerDashboard/ProjectStatusBadge.jsx
import React from 'react';
const ProjectStatusBadge = ({ status }) => {
  const map = { 'Not Started': 'mgr-status-notstarted', 'In Progress': 'mgr-status-progress', 'On Hold': 'mgr-status-onhold', 'Completed': 'mgr-status-completed', 'Delayed': 'mgr-status-delayed' };
  return <span className={`mgr-badge ${map[status] || ''}`}>{status}</span>;
};
export default ProjectStatusBadge;