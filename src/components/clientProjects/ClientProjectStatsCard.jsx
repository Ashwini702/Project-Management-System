// src/components/clientProjects/ClientProjectStatsCard.jsx
import React from 'react';
import { FiFolder, FiTrendingUp, FiCheckCircle, FiClock, FiAlertCircle, FiFileText } from 'react-icons/fi';
const iconMap = { FiFolder, FiTrendingUp, FiCheckCircle, FiClock, FiAlertCircle, FiFileText };

const ClientProjectStatsCard = ({ stat }) => {
  const cmap = { primary: 'clp-stat-primary', info: 'clp-stat-info', success: 'clp-stat-success', warning: 'clp-stat-warning', danger: 'clp-stat-danger', purple: 'clp-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`clp-stat-card ${cmap[stat.color]}`}>
      <div className="clp-stat-content">
        <div className="clp-stat-icon-wrapper"><Icon className="clp-stat-icon" /></div>
        <div className="clp-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ClientProjectStatsCard;