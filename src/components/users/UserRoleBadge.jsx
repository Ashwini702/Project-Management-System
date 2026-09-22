// src/components/users/UserRoleBadge.jsx
import React from 'react';

const UserRoleBadge = ({ role }) => {
  const getBadgeClass = (role) => {
    const badgeMap = {
      'Admin': 'role-badge-admin',
      'Project Manager': 'role-badge-pm',
      'Team Member': 'role-badge-tm',
      'Client': 'role-badge-client'
    };
    return badgeMap[role] || 'role-badge-default';
  };

  return (
    <span className={`role-badge ${getBadgeClass(role)}`}>
      {role}
    </span>
  );
};

export default UserRoleBadge;
