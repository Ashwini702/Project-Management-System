// src/components/team/TeamStatsCard.jsx
import React from 'react';
import { FiUsers, FiUserCheck, FiCalendar, FiGrid, FiAlertTriangle, FiSmile } from 'react-icons/fi';

const iconMap = {
  FiUsers, FiUserCheck, FiCalendar, FiGrid, FiAlertTriangle, FiSmile
};

const TeamStatsCard = ({ stat }) => {
  const getColorClass = (color) => {
    const colorMap = {
      primary: 'team-stat-primary',
      success: 'team-stat-success',
      warning: 'team-stat-warning',
      info: 'team-stat-info',
      danger: 'team-stat-danger',
      purple: 'team-stat-purple'
    };
    return colorMap[color] || 'team-stat-primary';
  };

  const Icon = iconMap[stat.icon];

  return (
    <div className={`team-stat-card ${getColorClass(stat.color)}`}>
      <div className="team-stat-content">
        <div className="team-stat-icon-wrapper">
          <Icon className="team-stat-icon" />
        </div>
        <div className="team-stat-info">
          <h3 className="team-stat-value">{stat.value}</h3>
          <p className="team-stat-title">{stat.title}</p>
          <span className="team-stat-desc">{stat.description}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsCard;