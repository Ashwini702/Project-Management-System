// src/components/clients/ClientStatsCard.jsx
import React from 'react';
import { FiUsers, FiUserCheck, FiClock, FiCheckCircle, FiMessageSquare, FiDollarSign } from 'react-icons/fi';

const iconMap = { FiUsers, FiUserCheck, FiClock, FiCheckCircle, FiMessageSquare, FiDollarSign };

const ClientStatsCard = ({ stat }) => {
  const getColorClass = (color) => {
    const colorMap = {
      primary: 'client-stat-primary', success: 'client-stat-success', warning: 'client-stat-warning',
      info: 'client-stat-info', purple: 'client-stat-purple', danger: 'client-stat-danger'
    };
    return colorMap[color] || 'client-stat-primary';
  };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`client-stat-card ${getColorClass(stat.color)}`}>
      <div className="client-stat-content">
        <div className="client-stat-icon-wrapper"><Icon className="client-stat-icon" /></div>
        <div className="client-stat-info">
          <h3 className="client-stat-value">{stat.value}</h3>
          <p className="client-stat-title">{stat.title}</p>
          <span className="client-stat-desc">{stat.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientStatsCard;