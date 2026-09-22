// src/components/error/PermissionInfoCard.jsx
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const PermissionInfoCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div className="perm-info-card" onClick={onClick}>
      <div className="perm-card-icon">
        <Icon />
      </div>
      <div className="perm-card-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
      <div className="perm-card-arrow">
        <FiArrowRight />
      </div>
    </div>
  );
};

export default PermissionInfoCard;