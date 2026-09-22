// src/components/teamDeadlines/TeamDeadlinePriorityBadge.jsx
import React from 'react';
const TeamDeadlinePriorityBadge = ({ priority }) => {
  const map = { 'Low': 'td-priority-low', 'Medium': 'td-priority-medium', 'High': 'td-priority-high', 'Urgent': 'td-priority-urgent' };
  return <span className={`td-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default TeamDeadlinePriorityBadge;