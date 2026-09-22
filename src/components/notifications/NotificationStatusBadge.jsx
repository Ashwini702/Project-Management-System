// src/components/notifications/NotificationStatusBadge.jsx
import React from 'react';
const NotificationStatusBadge = ({ status, isRead }) => {
  if (status === 'Read' || isRead) return <span className="notif-status-badge nt-status-read">Read</span>;
  if (status === 'Unread' || !isRead) return <span className="notif-status-badge nt-status-unread">Unread</span>;
  const smap = { 'Sent': 'nt-status-sent', 'Pending': 'nt-status-pending', 'Failed': 'nt-status-failed' };
  return <span className={`notif-status-badge ${smap[status] || ''}`}>{status}</span>;
};
export default NotificationStatusBadge;