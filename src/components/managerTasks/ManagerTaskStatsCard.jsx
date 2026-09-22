// src/components/managerTasks/ManagerTaskStatsCard.jsx
import React from 'react';
import { FiCheckSquare, FiClock, FiTrendingUp, FiEye, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
const iconMap = { FiCheckSquare, FiClock, FiTrendingUp, FiEye, FiCheckCircle, FiAlertTriangle };

const ManagerTaskStatsCard = ({ stat }) => {
  const cmap = { primary: 'mt-stat-primary', warning: 'mt-stat-warning', info: 'mt-stat-info', purple: 'mt-stat-purple', success: 'mt-stat-success', danger: 'mt-stat-danger' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mt-stat-card ${cmap[stat.color]}`}>
      <div className="mt-stat-content">
        <div className="mt-stat-icon-wrapper"><Icon className="mt-stat-icon" /></div>
        <div className="mt-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ManagerTaskStatsCard;