// src/components/users/UserStatsCard.jsx
import React from 'react';

const UserStatsCard = ({ stat }) => {
  const getColorClass = (color) => {
    const colorMap = {
      primary: 'stat-card-primary',
      purple: 'stat-card-purple',
      success: 'stat-card-success',
      info: 'stat-card-info',
      warning: 'stat-card-warning'
    };
    return colorMap[color] || 'stat-card-primary';
  };

  const Icon = stat.icon;

  return (
    <div className={`user-stat-card ${getColorClass(stat.color)}`}>
      <div className="user-stat-content">
        <div className="user-stat-icon-wrapper">
          <Icon className="user-stat-icon" />
        </div>
        <div className="user-stat-info">
          <h3 className="user-stat-value">{stat.value}</h3>
          <p className="user-stat-title">{stat.title}</p>
          <span className="user-stat-desc">{stat.description}</span>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;