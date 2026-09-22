// src/components/clientProjects/ClientProjectPriorityBadge.jsx
import React from 'react';
const ClientProjectPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'clp-priority-low', 'Medium': 'clp-priority-medium', 'High': 'clp-priority-high', 'Urgent': 'clp-priority-urgent' };
  return <span className={`clp-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default ClientProjectPriorityBadge;