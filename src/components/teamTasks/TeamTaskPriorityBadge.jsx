// src/components/teamTasks/TeamTaskPriorityBadge.jsx
import React from 'react';
const TeamTaskPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'tt-priority-low', 'Medium': 'tt-priority-medium', 'High': 'tt-priority-high', 'Urgent': 'tt-priority-urgent' };
  return <span className={`tt-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default TeamTaskPriorityBadge;