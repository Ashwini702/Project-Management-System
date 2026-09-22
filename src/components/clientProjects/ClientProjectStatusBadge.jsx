// src/components/clientProjects/ClientProjectStatusBadge.jsx
import React from 'react';
const ClientProjectStatusBadge = ({ status }) => {
  const map = { 'Not Started': 'clp-status-notstarted', 'In Progress': 'clp-status-progress', 'On Hold': 'clp-status-onhold', 'Completed': 'clp-status-completed', 'Delayed': 'clp-status-delayed' };
  return <span className={`clp-badge ${map[status] || ''}`}>{status}</span>;
};
export default ClientProjectStatusBadge;