// src/components/auth/RegisterRoleCard.jsx
import React from 'react';
import { FiShield, FiUserCheck, FiUser, FiBriefcase } from 'react-icons/fi';

const rolesData = [
  { id: 'Admin', label: 'Admin', icon: FiShield, description: 'Full system access & control' },
  { id: 'Project Manager', label: 'Project Manager', icon: FiUserCheck, description: 'Manage projects & teams' },
  { id: 'Team Member', label: 'Team Member', icon: FiUser, description: 'Work on assigned tasks' },
  { id: 'Client', label: 'Client', icon: FiBriefcase, description: 'Track project progress' }
];

const RegisterRoleCard = ({ selectedRole, onSelect }) => {
  return (
    <div className="role-selection-grid">
      {rolesData.map((role) => (
        <div
          key={role.id}
          className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
          onClick={() => onSelect(role.id)}
        >
          <div className="role-card-icon">
            <role.icon />
          </div>
          <div className="role-card-info">
            <h6>{role.label}</h6>
            <span>{role.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisterRoleCard;