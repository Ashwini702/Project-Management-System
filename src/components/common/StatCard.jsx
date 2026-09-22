// src/components/dashboard/StatCard.jsx
import React from 'react';

const StatCard = ({ stat }) => {
  const getColorClass = (color) => {
    const colorMap = {
      primary: 'stat-primary',
      success: 'stat-success',
      warning: 'stat-warning',
      danger: 'stat-danger',
      info: 'stat-info',
      purple: 'stat-purple'
    };
    return colorMap[color] || 'stat-primary';
  };

  const Icon = stat.icon;

  return (
    <div className={`stat-card ${getColorClass(stat.color)}`}>
      <div className="stat-card-content">
        <div className="stat-icon-wrapper">
          <Icon className="stat-icon" />
        </div>
        <div className="stat-info">
          <h3 className="stat-value">{stat.value}</h3>
          <p className="stat-title">{stat.title}</p>
          <span className="stat-growth">{stat.growth}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;