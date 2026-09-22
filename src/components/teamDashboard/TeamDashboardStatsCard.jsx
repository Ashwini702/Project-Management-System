// src/components/teamDashboard/TeamDashboardStatsCard.jsx
import React from 'react';
import { FiActivity, FiAlertCircle, FiCheckCircle, FiCheckSquare, FiClock, FiFolder, FiTrendingUp, FiUserCheck } from 'react-icons/fi';
const iconMap = { FiActivity, FiAlertCircle, FiCheckCircle, FiCheckSquare, FiClock, FiFolder, FiTrendingUp, FiUserCheck };

const TeamDashboardStatsCard = ({ stat }) => {
  const cmap = { primary: 'tm-stat-primary', warning: 'tm-stat-warning', info: 'tm-stat-info', success: 'tm-stat-success', danger: 'tm-stat-danger', purple: 'tm-stat-purple' };
  const Icon = iconMap[stat.icon] || FiCheckSquare;
  return (
    <div className={`tm-stat-card ${cmap[stat.color]}`}>
      <div className="tm-stat-content">
        <div className="tm-stat-icon-wrapper"><Icon className="tm-stat-icon" /></div>
        <div className="tm-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default TeamDashboardStatsCard;