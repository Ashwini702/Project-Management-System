// src/components/backup/BackupStatsCard.jsx
import React from 'react';
import { FiDatabase, FiCheckCircle, FiAlertTriangle, FiClock, FiHardDrive, FiRefreshCw } from 'react-icons/fi';
const iconMap = { FiDatabase, FiCheckCircle, FiAlertTriangle, FiClock, FiHardDrive, FiRefreshCw };
const BackupStatsCard = ({ stat }) => {
  const cmap = { primary: 'bkp-stat-primary', success: 'bkp-stat-success', danger: 'bkp-stat-danger', warning: 'bkp-stat-warning', info: 'bkp-stat-info', purple: 'bkp-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`bkp-stat-card ${cmap[stat.color]}`}>
      <div className="bkp-stat-content">
        <div className="bkp-stat-icon-wrapper"><Icon className="bkp-stat-icon" /></div>
        <div className="bkp-stat-info"><h3 className="bkp-stat-value">{stat.value}</h3><p className="bkp-stat-title">{stat.title}</p><span className="bkp-stat-desc">{stat.description}</span></div>
      </div>
    </div>
  );
};
export default BackupStatsCard;