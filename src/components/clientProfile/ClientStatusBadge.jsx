// src/components/clientProfile/ClientStatusBadge.jsx
import React from 'react';
const ClientStatusBadge = ({ status, type = 'status' }) => {
  if (type === 'payment') {
    const pmap = { 'Paid': 'cprof-badge-paid', 'Pending': 'cprof-badge-pending-pay', 'Partial': 'cprof-badge-partial', 'Overdue': 'cprof-badge-overdue' };
    return <span className={`cprof-badge ${pmap[status] || ''}`}>{status}</span>;
  }
  const smap = { 'Active': 'cprof-badge-active', 'Verified': 'cprof-badge-verified', 'Pending': 'cprof-badge-pending', 'Inactive': 'cprof-badge-inactive', 'Completed': 'cprof-badge-completed', 'In Progress': 'cprof-badge-progress', 'On Hold': 'cprof-badge-onhold' };
  return <span className={`cprof-badge ${smap[status] || ''}`}>{status}</span>;
};
export default ClientStatusBadge;