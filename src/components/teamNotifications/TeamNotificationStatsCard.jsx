// src/components/teamNotifications/TeamNotificationStatsCard.jsx
import React from 'react';
import { FiBell, FiMail, FiCheckSquare, FiClock, FiEdit3, FiVolume2 } from 'react-icons/fi';
const iconMap = { FiBell, FiMail, FiCheckSquare, FiClock, FiEdit3, FiVolume2 };

const TeamNotificationStatsCard = ({ stat }) => {
  const cmap = { primary: 'tn-stat-primary', warning: 'tn-stat-warning', info: 'tn-stat-info', danger: 'tn-stat-danger', success: 'tn-stat-success', purple: 'tn-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`tn-stat-card ${cmap[stat.color]}`}>
      <div className="tn-stat-content">
        <div className="tn-stat-icon-wrapper"><Icon className="tn-stat-icon" /></div>
        <div className="tn-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default TeamNotificationStatsCard;