// src/components/activityLogs/ActivityStatusBadge.jsx
import React from 'react';

const ActivityStatusBadge = ({ status }) => {
  const map = { 'Success': 'act-status-success', 'Failed': 'act-status-failed', 'Warning': 'act-status-warning', 'Critical': 'act-status-critical', 'Suspicious': 'act-status-suspicious' };
  return <span className={`activity-status-badge ${map[status] || ''}`}>{status}</span>;
};

export default ActivityStatusBadge;