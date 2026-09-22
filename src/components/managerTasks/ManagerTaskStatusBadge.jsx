// src/components/managerTasks/ManagerTaskStatusBadge.jsx
import React from 'react';
const ManagerTaskStatusBadge = ({ status }) => {
  const map = { 'Pending': 'mt-status-pending', 'In Progress': 'mt-status-progress', 'Under Review': 'mt-status-review', 'Completed': 'mt-status-completed', 'Reopened': 'mt-status-reopened', 'Blocked': 'mt-status-blocked', 'Cancelled': 'mt-status-cancelled' };
  return <span className={`mt-badge ${map[status] || ''}`}>{status}</span>;
};
export default ManagerTaskStatusBadge;