// src/components/teamProjects/TeamProjectStatsCard.jsx
import React from 'react';
import { FiFolder, FiTrendingUp, FiCheckCircle, FiAlertTriangle, FiCheckSquare, FiClock } from 'react-icons/fi';
const iconMap = { FiFolder, FiTrendingUp, FiCheckCircle, FiAlertTriangle, FiCheckSquare, FiClock };

const TeamProjectStatsCard = ({ stat }) => {
  const cmap = { primary: 'tp-stat-primary', info: 'tp-stat-info', success: 'tp-stat-success', danger: 'tp-stat-danger', warning: 'tp-stat-warning', purple: 'tp-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`tp-stat-card ${cmap[stat.color]}`}>
      <div className="tp-stat-content">
        <div className="tp-stat-icon-wrapper"><Icon className="tp-stat-icon" /></div>
        <div className="tp-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default TeamProjectStatsCard;