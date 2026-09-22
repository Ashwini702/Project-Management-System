// src/components/clientDashboard/ClientStatusBadge.jsx
import React from 'react';

const ClientStatusBadge = ({ status, type = 'project' }) => {
  if (type === 'payment') {
    const pmap = { 'Paid': 'cl-paid', 'Pending': 'cl-pending-pay', 'Partial': 'cl-partial', 'Overdue': 'cl-overdue' };
    return <span className={`cl-badge ${pmap[status] || ''}`}>{status}</span>;
  }
  if (type === 'feedback') {
    const fmap = { 'Pending': 'cl-pending-fb', 'Approved': 'cl-approved', 'Rejected': 'cl-rejected', 'Resolved': 'cl-resolved' };
    return <span className={`cl-badge ${fmap[status] || ''}`}>{status}</span>;
  }
  const smap = { 'Not Started': 'cl-notstarted', 'In Progress': 'cl-progress', 'On Hold': 'cl-onhold', 'Completed': 'cl-completed', 'Delayed': 'cl-delayed' };
  return <span className={`cl-badge ${smap[status] || ''}`}>{status}</span>;
};

export default ClientStatusBadge;