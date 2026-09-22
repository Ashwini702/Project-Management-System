// src/components/clientDashboard/ClientStatsCard.jsx
import React from 'react';
import { FiFolder, FiCheckCircle, FiMessageSquare, FiClock, FiFileText, FiDollarSign } from 'react-icons/fi';

const iconMap = { FiFolder, FiCheckCircle, FiMessageSquare, FiClock, FiFileText, FiDollarSign };

const ClientStatsCard = ({ stat }) => {
  const cmap = { primary: 'cl-stat-primary', success: 'cl-stat-success', warning: 'cl-stat-warning', danger: 'cl-stat-danger', info: 'cl-stat-info', purple: 'cl-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`cl-stat-card ${cmap[stat.color]}`}>
      <div className="cl-stat-content">
        <div className="cl-stat-icon-wrapper"><Icon className="cl-stat-icon" /></div>
        <div className="cl-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};

export default ClientStatsCard;