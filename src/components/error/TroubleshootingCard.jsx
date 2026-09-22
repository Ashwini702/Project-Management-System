// src/components/error/TroubleshootingCard.jsx
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const TroubleshootingCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div className="se-trouble-card" onClick={onClick}>
      <div className="se-trouble-card-icon">
        <Icon />
      </div>
      <div className="se-trouble-card-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
      <div className="se-trouble-card-arrow">
        <FiArrowRight />
      </div>
    </div>
  );
};

export default TroubleshootingCard;