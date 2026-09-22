// src/components/team/MemberStatusBadge.jsx
import React from 'react';

const MemberStatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    const statusMap = {
      'Active': 'member-status-active',
      'On Leave': 'member-status-leave',
      'Inactive': 'member-status-inactive',
      'Available': 'member-status-available',
      'Busy': 'member-status-busy'
    };
    return statusMap[status] || 'member-status-default';
  };

  return (
    <span className={`member-status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default MemberStatusBadge;