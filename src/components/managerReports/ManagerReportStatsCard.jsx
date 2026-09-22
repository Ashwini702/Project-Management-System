// src/components/managerReports/ManagerReportStatsCard.jsx
import React from 'react';
import { FiFolder, FiCheckCircle, FiCheckSquare, FiTrendingUp, FiAlertTriangle, FiSmile } from 'react-icons/fi';
const iconMap = { FiFolder, FiCheckCircle, FiCheckSquare, FiTrendingUp, FiAlertTriangle, FiSmile };

const ManagerReportStatsCard = ({ stat }) => {
  const cmap = { primary: 'mrpt-stat-primary', success: 'mrpt-stat-success', info: 'mrpt-stat-info', warning: 'mrpt-stat-warning', danger: 'mrpt-stat-danger', purple: 'mrpt-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mrpt-stat-card ${cmap[stat.color]}`}>
      <div className="mrpt-stat-content">
        <div className="mrpt-stat-icon-wrapper"><Icon className="mrpt-stat-icon" /></div>
        <div className="mrpt-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ManagerReportStatsCard;