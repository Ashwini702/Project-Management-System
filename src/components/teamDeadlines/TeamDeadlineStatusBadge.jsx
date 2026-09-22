// src/components/teamDeadlines/TeamDeadlineStatusBadge.jsx
import React from 'react';
const TeamDeadlineStatusBadge = ({ status }) => {
  const map = { 'Pending': 'td-status-pending', 'In Progress': 'td-status-progress', 'Under Review': 'td-status-review', 'Completed': 'td-status-completed', 'Overdue': 'td-status-overdue', 'Missed': 'td-status-missed' };
  return <span className={`td-badge ${map[status] || ''}`}>{status}</span>;
};
export default TeamDeadlineStatusBadge;