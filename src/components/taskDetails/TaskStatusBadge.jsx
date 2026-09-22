// src/components/taskDetails/TaskStatusBadge.jsx
import React from 'react';
const TaskStatusBadge = ({ status }) => {
  const map = { 'Pending': 'td-status-pending', 'In Progress': 'td-status-progress', 'Under Review': 'td-status-review', 'Completed': 'td-status-completed', 'Reopened': 'td-status-reopened', 'Cancelled': 'td-status-cancelled' };
  return <span className={`td-badge ${map[status] || ''}`}>{status}</span>;
};
export default TaskStatusBadge;