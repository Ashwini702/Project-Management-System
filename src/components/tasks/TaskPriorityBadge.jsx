// src/components/tasks/TaskPriorityBadge.jsx
import React from 'react';

const TaskPriorityBadge = ({ priority }) => {
  const getPriorityClass = (priority) => {
    const priorityMap = {
      'Low': 'task-priority-low',
      'Medium': 'task-priority-medium',
      'High': 'task-priority-high',
      'Urgent': 'task-priority-urgent'
    };
    return priorityMap[priority] || 'task-priority-default';
  };

  return (
    <span className={`task-priority-badge ${getPriorityClass(priority)}`}>
      {priority}
    </span>
  );
};

export default TaskPriorityBadge;