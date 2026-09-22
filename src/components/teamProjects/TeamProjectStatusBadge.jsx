import React from 'react';

const TeamProjectStatusBadge = ({ status }) => {
  const classMap = {
    'Not Started': 'tp-status-notstarted',
    'In Progress': 'tp-status-progress',
    Completed: 'tp-status-completed',
    'On Hold': 'tp-status-onhold',
    Delayed: 'tp-status-delayed',
    Pending: 'tp-status-pending',
    'Under Review': 'tp-status-review'
  };

  return <span className={`tp-badge ${classMap[status] || ''}`}>{status}</span>;
};

export default TeamProjectStatusBadge;
