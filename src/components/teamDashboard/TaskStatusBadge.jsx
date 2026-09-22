// src/components/teamDashboard/TaskStatusBadge.jsx
import React from 'react';
const TaskStatusBadge = ({ status }) => {
  const map = { 'Pending': 'tm-status-pending', 'In Progress': 'tm-status-progress', 'Under Review': 'tm-status-review', 'Completed': 'tm-status-completed', 'Blocked': 'tm-status-blocked', 'Reopened': 'tm-status-reopened' };
  return <span className={`tm-badge ${map[status] || ''}`}>{status}</span>;
};
export default TaskStatusBadge;