// src/components/error/ErrorActionCard.jsx
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const ErrorActionCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div className="error-action-card" onClick={onClick}>
      <div className="action-card-icon">
        <Icon />
      </div>
      <div className="action-card-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
      <div className="action-card-arrow">
        <FiArrowRight />
      </div>
    </div>
  );
};

export default ErrorActionCard;