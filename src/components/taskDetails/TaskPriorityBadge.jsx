// src/components/taskDetails/TaskPriorityBadge.jsx
import React from 'react';
const TaskPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'td-priority-low', 'Medium': 'td-priority-medium', 'High': 'td-priority-high', 'Urgent': 'td-priority-urgent' };
  return <span className={`td-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default TaskPriorityBadge;