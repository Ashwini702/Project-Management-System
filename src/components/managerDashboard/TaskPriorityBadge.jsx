// src/components/managerDashboard/TaskPriorityBadge.jsx
import React from 'react';
const TaskPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'mgr-priority-low', 'Medium': 'mgr-priority-medium', 'High': 'mgr-priority-high', 'Urgent': 'mgr-priority-urgent' };
  return <span className={`mgr-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default TaskPriorityBadge;