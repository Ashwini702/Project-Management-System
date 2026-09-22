// src/components/clientMessages/ClientMessageStatusBadge.jsx
import React from 'react';
const ClientMessageStatusBadge = ({ status }) => {
  const map = { 'Read': 'cmsg-status-read', 'Unread': 'cmsg-status-unread', 'Important': 'cmsg-status-important', 'Archived': 'cmsg-status-archived', 'Open': 'cmsg-status-open', 'In Progress': 'cmsg-status-progress', 'Waiting for Client': 'cmsg-status-waiting', 'Resolved': 'cmsg-status-resolved', 'Closed': 'cmsg-status-closed' };
  return <span className={`cmsg-badge ${map[status] || ''}`}>{status}</span>;
};
export default ClientMessageStatusBadge;