import React from 'react';

const ManagerReportStatusBadge = ({ status, type = 'status' }) => {
  const statusClassMap = {
    'Not Started': 'mrpt-notstarted',
    'In Progress': 'mrpt-progress',
    Completed: 'mrpt-completed',
    Delayed: 'mrpt-delayed',
    'On Hold': 'mrpt-onhold',
    Pending: 'mrpt-pending',
    Resolved: 'mrpt-completed',
    Open: 'mrpt-progress',
    Closed: 'mrpt-completed'
  };

  const gradeClassMap = {
    Excellent: 'mrpt-grade-excellent',
    Good: 'mrpt-grade-good',
    Average: 'mrpt-grade-average',
    Poor: 'mrpt-grade-poor'
  };

  const className =
    type === 'grade'
      ? gradeClassMap[status]
      : statusClassMap[status];

  return <span className={`mrpt-badge ${className || ''}`}>{status}</span>;
};

export default ManagerReportStatusBadge;
