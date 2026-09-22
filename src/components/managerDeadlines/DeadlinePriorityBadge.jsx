// src/components/managerDeadlines/DeadlinePriorityBadge.jsx
import React from 'react';
const DeadlinePriorityBadge = ({ priority }) => {
  const map = { 'Low': 'mdl-priority-low', 'Medium': 'mdl-priority-medium', 'High': 'mdl-priority-high', 'Urgent': 'mdl-priority-urgent' };
  return <span className={`mdl-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default DeadlinePriorityBadge;