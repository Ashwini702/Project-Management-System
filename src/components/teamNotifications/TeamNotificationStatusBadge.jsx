// src/components/teamNotifications/TeamNotificationStatusBadge.jsx
import React from 'react';
const TeamNotificationStatusBadge = ({ status, isRead }) => {
  if (status === 'Read' || (isRead && status !== 'Important')) return <span className="tn-badge tn-status-read">Read</span>;
  if (status === 'Unread' || !isRead) return <span className="tn-badge tn-status-unread">Unread</span>;
  if (status === 'Important') return <span className="tn-badge tn-status-important">Important</span>;
  if (status === 'Archived') return <span className="tn-badge tn-status-archived">Archived</span>;
  return null;
};
export default TeamNotificationStatusBadge;