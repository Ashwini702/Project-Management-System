// src/components/teamDashboard/TaskPriorityBadge.jsx
import React from 'react';
const TaskPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'tm-priority-low', 'Medium': 'tm-priority-medium', 'High': 'tm-priority-high', 'Urgent': 'tm-priority-urgent' };
  return <span className={`tm-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default TaskPriorityBadge;