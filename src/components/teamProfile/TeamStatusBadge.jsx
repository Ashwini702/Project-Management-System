// src/components/teamProfile/TeamStatusBadge.jsx
import React from 'react';
const TeamStatusBadge = ({ status, type = 'status' }) => {
  if (type === 'grade') {
    const gmap = { 'Excellent': 'tprof-badge-excellent', 'Good': 'tprof-badge-good', 'Average': 'tprof-badge-average', 'Needs Improvement': 'tprof-badge-poor' };
    return <span className={`tprof-badge ${gmap[status] || ''}`}>{status}</span>;
  }
  const smap = { 'Active': 'tprof-badge-active', 'Available': 'tprof-badge-available', 'Busy': 'tprof-badge-busy', 'On Leave': 'tprof-badge-leave', 'Offline': 'tprof-badge-offline', 'Inactive': 'tprof-badge-inactive', 'Completed': 'tprof-badge-completed', 'In Progress': 'tprof-badge-progress', 'Pending': 'tprof-badge-pending', 'Overdue': 'tprof-badge-overdue' };
  return <span className={`tprof-badge ${smap[status] || ''}`}>{status}</span>;
};
export default TeamStatusBadge;