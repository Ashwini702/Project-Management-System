// src/components/managerWorkload/AvailabilityStatusBadge.jsx
import React from 'react';
const AvailabilityStatusBadge = ({ status }) => {
  const map = { 'Available': 'mwl-avail-available', 'Busy': 'mwl-avail-busy', 'On Leave': 'mwl-avail-leave', 'Overloaded': 'mwl-avail-overloaded', 'Inactive': 'mwl-avail-inactive' };
  return <span className={`mwl-badge ${map[status] || ''}`}>{status}</span>;
};
export default AvailabilityStatusBadge;