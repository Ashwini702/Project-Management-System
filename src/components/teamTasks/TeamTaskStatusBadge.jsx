// src/components/teamTasks/TeamTaskStatusBadge.jsx
import React from 'react';
const TeamTaskStatusBadge = ({ status }) => {
  const map = { 'Pending': 'tt-status-pending', 'In Progress': 'tt-status-progress', 'Under Review': 'tt-status-review', 'Completed': 'tt-status-completed', 'Blocked': 'tt-status-blocked', 'Overdue': 'tt-status-overdue' };
  return <span className={`tt-badge ${map[status] || ''}`}>{status}</span>;
};
export default TeamTaskStatusBadge;