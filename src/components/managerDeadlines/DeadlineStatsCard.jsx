// src/components/managerDeadlines/DeadlineStatsCard.jsx
import React from 'react';
import { FiCalendar, FiClock, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
const iconMap = { FiCalendar, FiClock, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiAlertCircle };

const DeadlineStatsCard = ({ stat }) => {
  const cmap = { primary: 'mdl-stat-primary', warning: 'mdl-stat-warning', info: 'mdl-stat-info', danger: 'mdl-stat-danger', success: 'mdl-stat-success', purple: 'mdl-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mdl-stat-card ${cmap[stat.color]}`}>
      <div className="mdl-stat-content">
        <div className="mdl-stat-icon-wrapper"><Icon className="mdl-stat-icon" /></div>
        <div className="mdl-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default DeadlineStatsCard;