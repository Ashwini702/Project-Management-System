// src/components/notifications/NotificationStatsCard.jsx
import React from 'react';
import { FiBell, FiMail, FiClock, FiCheckSquare, FiFolder, FiVolume2 } from 'react-icons/fi';
const iconMap = { FiBell, FiMail, FiClock, FiCheckSquare, FiFolder, FiVolume2 };
const NotificationStatsCard = ({ stat }) => {
  const cmap = { primary: 'nt-stat-primary', warning: 'nt-stat-warning', danger: 'nt-stat-danger', info: 'nt-stat-info', success: 'nt-stat-success', purple: 'nt-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`nt-stat-card ${cmap[stat.color]}`}>
      <div className="nt-stat-content">
        <div className="nt-stat-icon-wrapper"><Icon className="nt-stat-icon" /></div>
        <div className="nt-stat-info"><h3 className="nt-stat-value">{stat.value}</h3><p className="nt-stat-title">{stat.title}</p><span className="nt-stat-desc">{stat.description}</span></div>
      </div>
    </div>
  );
};
export default NotificationStatsCard;
