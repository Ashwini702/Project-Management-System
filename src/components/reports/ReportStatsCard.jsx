// src/components/reports/ReportStatsCard.jsx
import React from 'react';
import { FiFolder, FiCheckCircle, FiClock, FiTrendingUp, FiAlertTriangle, FiSmile } from 'react-icons/fi';

const iconMap = { FiFolder, FiCheckCircle, FiClock, FiTrendingUp, FiAlertTriangle, FiSmile };

const ReportStatsCard = ({ stat }) => {
  const cmap = { primary: 'rpt-stat-primary', success: 'rpt-stat-success', warning: 'rpt-stat-warning', info: 'rpt-stat-info', danger: 'rpt-stat-danger', purple: 'rpt-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`rpt-stat-card ${cmap[stat.color]}`}>
      <div className="rpt-stat-content">
        <div className="rpt-stat-icon-wrapper"><Icon className="rpt-stat-icon" /></div>
        <div className="rpt-stat-info"><h3 className="rpt-stat-value">{stat.value}</h3><p className="rpt-stat-title">{stat.title}</p><span className="rpt-stat-desc">{stat.description}</span></div>
      </div>
    </div>
  );
};

export default ReportStatsCard;