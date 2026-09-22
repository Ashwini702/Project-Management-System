// src/components/clientProfile/ClientProfileStatsCard.jsx
import React from 'react';
import { FiFolder, FiTrendingUp, FiCheckCircle, FiFileText, FiClock, FiDollarSign } from 'react-icons/fi';
const iconMap = { FiFolder, FiTrendingUp, FiCheckCircle, FiFileText, FiClock, FiDollarSign };

const ClientProfileStatsCard = ({ stat }) => {
  const cmap = { primary: 'cprof-stat-primary', info: 'cprof-stat-info', success: 'cprof-stat-success', warning: 'cprof-stat-warning', danger: 'cprof-stat-danger', purple: 'cprof-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`cprof-stat-card ${cmap[stat.color]}`}>
      <div className="cprof-stat-content">
        <div className="cprof-stat-icon-wrapper"><Icon className="cprof-stat-icon" /></div>
        <div className="cprof-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ClientProfileStatsCard;