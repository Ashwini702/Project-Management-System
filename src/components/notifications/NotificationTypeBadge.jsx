// src/components/notifications/NotificationTypeBadge.jsx
import React from 'react';
const NotificationTypeBadge = ({ type }) => {
  const map = {
    'Project Assigned': 'nt-type-project', 'Task Assigned': 'nt-type-task', 'Deadline Reminder': 'nt-type-deadline',
    'Task Completed': 'nt-type-completed', 'Project Status Update': 'nt-type-status', 'Client Feedback': 'nt-type-feedback',
    'Payment Reminder': 'nt-type-payment', 'Admin Announcement': 'nt-type-announce', 'System Alert': 'nt-type-system'
  };
  return <span className={`notif-type-badge ${map[type] || ''}`}>{type}</span>;
};
export default NotificationTypeBadge;