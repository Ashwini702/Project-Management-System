// src/components/tasks/TaskStatusBadge.jsx
import React from 'react';

const TaskStatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    const statusMap = {
      'Pending': 'task-status-pending',
      'In Progress': 'task-status-progress',
      'Under Review': 'task-status-review',
      'Completed': 'task-status-completed',
      'Reopened': 'task-status-reopened',
      'Cancelled': 'task-status-cancelled'
    };
    return statusMap[status] || 'task-status-default';
  };

  return (
    <span className={`task-status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default TaskStatusBadge;