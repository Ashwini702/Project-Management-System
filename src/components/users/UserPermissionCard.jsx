// src/components/users/UserPermissionCard.jsx
import React from 'react';

const UserPermissionCard = ({ permission }) => {
  const getCardClass = (color) => {
    const colorMap = {
      purple: 'perm-card-purple',
      success: 'perm-card-success',
      info: 'perm-card-info',
      warning: 'perm-card-warning'
    };
    return colorMap[color] || 'perm-card-primary';
  };

  const Icon = permission.icon;

  return (
    <div className={`permission-card ${getCardClass(permission.color)}`}>
      <div className="permission-card-header">
        <div className="permission-icon-wrapper">
          <Icon className="permission-icon" />
        </div>
        <h4 className="permission-role-title">{permission.role}</h4>
      </div>
      <ul className="permission-list">
        {permission.permissions.map((perm, index) => (
          <li key={index} className="permission-item">
            <span className="permission-check">✓</span>
            <span className="permission-text">{perm}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPermissionCard;