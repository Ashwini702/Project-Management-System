// src/components/teamDeadlines/TeamDeadlineStatsCard.jsx
import React from 'react';
import { FiCalendar, FiClock, FiTrendingUp, FiArrowUp, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
const iconMap = { FiCalendar, FiClock, FiTrendingUp, FiArrowUp, FiCheckCircle, FiAlertTriangle };

const TeamDeadlineStatsCard = ({ stat }) => {
  const cmap = { primary: 'td-stat-primary', warning: 'td-stat-warning', info: 'td-stat-info', success: 'td-stat-success', purple: 'td-stat-purple', danger: 'td-stat-danger' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`td-stat-card ${cmap[stat.color]}`}>
      <div className="td-stat-content">
        <div className="td-stat-icon-wrapper"><Icon className="td-stat-icon" /></div>
        <div className="td-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default TeamDeadlineStatsCard;