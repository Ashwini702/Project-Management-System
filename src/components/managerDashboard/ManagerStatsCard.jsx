// src/components/managerDashboard/ManagerStatsCard.jsx
import React from 'react';
import { FiFolder, FiCheckSquare, FiCheckCircle, FiUsers, FiClock, FiMessageSquare } from 'react-icons/fi';
const iconMap = { FiFolder, FiCheckSquare, FiCheckCircle, FiUsers, FiClock, FiMessageSquare };

const ManagerStatsCard = ({ stat }) => {
  const cmap = { primary: 'mgr-stat-primary', info: 'mgr-stat-info', success: 'mgr-stat-success', warning: 'mgr-stat-warning', danger: 'mgr-stat-danger', purple: 'mgr-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mgr-stat-card ${cmap[stat.color]}`}>
      <div className="mgr-stat-content">
        <div className="mgr-stat-icon-wrapper"><Icon className="mgr-stat-icon" /></div>
        <div className="mgr-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ManagerStatsCard;