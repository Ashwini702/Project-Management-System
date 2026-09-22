// src/components/managerProfile/ManagerStatusBadge.jsx
import React from 'react';
const ManagerStatusBadge = ({ status, type = 'status' }) => {
  if (type === 'grade') {
    const gmap = { 'Excellent': 'mp-badge-excellent', 'Good': 'mp-badge-good', 'Average': 'mp-badge-average', 'Needs Improvement': 'mp-badge-poor' };
    return <span className={`mp-badge ${gmap[status] || ''}`}>{status}</span>;
  }
  const smap = { 'Active': 'mp-badge-active', 'Available': 'mp-badge-available', 'Busy': 'mp-badge-busy', 'On Leave': 'mp-badge-leave', 'Inactive': 'mp-badge-inactive' };
  return <span className={`mp-badge ${smap[status] || ''}`}>{status}</span>;
};
export default ManagerStatusBadge;