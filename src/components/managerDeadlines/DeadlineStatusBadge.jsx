// src/components/managerDeadlines/DeadlineStatusBadge.jsx
import React from 'react';
const DeadlineStatusBadge = ({ status }) => {
  const map = { 'Upcoming': 'mdl-status-upcoming', 'Due Today': 'mdl-status-duetoday', 'Overdue': 'mdl-status-overdue', 'Completed': 'mdl-status-completed', 'Rescheduled': 'mdl-status-rescheduled', 'Cancelled': 'mdl-status-cancelled' };
  return <span className={`mdl-badge ${map[status] || ''}`}>{status}</span>;
};
export default DeadlineStatusBadge;