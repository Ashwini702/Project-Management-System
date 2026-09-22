// src/components/managerTasks/ManagerTaskPriorityBadge.jsx
import React from 'react';
const ManagerTaskPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'mt-priority-low', 'Medium': 'mt-priority-medium', 'High': 'mt-priority-high', 'Urgent': 'mt-priority-urgent' };
  return <span className={`mt-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default ManagerTaskPriorityBadge;