// src/components/managerNotifications/ManagerNotificationStatusBadge.jsx
import React from 'react';
const ManagerNotificationStatusBadge = ({ status, isRead }) => {
  if (status === 'Read' || (isRead && status !== 'Important')) return <span className="mgn-badge mgn-status-read">Read</span>;
  if (status === 'Unread' || !isRead) return <span className="mgn-badge mgn-status-unread">Unread</span>;
  if (status === 'Important') return <span className="mgn-badge mgn-status-important">Important</span>;
  if (status === 'Archived') return <span className="mgn-badge mgn-status-archived">Archived</span>;
  return null;
};
export default ManagerNotificationStatusBadge;