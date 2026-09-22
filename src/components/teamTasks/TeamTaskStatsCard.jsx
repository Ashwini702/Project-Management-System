// src/components/teamTasks/TeamTaskStatsCard.jsx
import React from 'react';
import { FiCheckSquare, FiClock, FiTrendingUp, FiEye, FiCheckCircle, FiAlertTriangle, FiActivity } from 'react-icons/fi';
const iconMap = { FiCheckSquare, FiClock, FiTrendingUp, FiEye, FiCheckCircle, FiAlertTriangle, FiActivity };

const TeamTaskStatsCard = ({ stat }) => {
  const cmap = { primary: 'tt-stat-primary', warning: 'tt-stat-warning', info: 'tt-stat-info', purple: 'tt-stat-purple', success: 'tt-stat-success', danger: 'tt-stat-danger' };
  const Icon = iconMap[stat.icon] || FiCheckSquare;
  return (
    <div className={`tt-stat-card ${cmap[stat.color]}`}>
      <div className="tt-stat-content">
        <div className="tt-stat-icon-wrapper"><Icon className="tt-stat-icon" /></div>
        <div className="tt-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default TeamTaskStatsCard;