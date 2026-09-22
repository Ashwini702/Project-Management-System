// src/components/teamProjects/TeamProjectPriorityBadge.jsx
import React from 'react';
const TeamProjectPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'tp-priority-low', 'Medium': 'tp-priority-medium', 'High': 'tp-priority-high', 'Urgent': 'tp-priority-urgent' };
  return <span className={`tp-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default TeamProjectPriorityBadge;