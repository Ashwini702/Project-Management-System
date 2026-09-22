// src/components/managerNotifications/ManagerNotificationStatsCard.jsx
import React from 'react';
import { FiBell, FiMail, FiCheckSquare, FiClock, FiMessageSquare, FiVideo } from 'react-icons/fi';
const iconMap = { FiBell, FiMail, FiCheckSquare, FiClock, FiMessageSquare, FiVideo };

const ManagerNotificationStatsCard = ({ stat }) => {
  const cmap = { primary: 'mgn-stat-primary', warning: 'mgn-stat-warning', info: 'mgn-stat-info', danger: 'mgn-stat-danger', success: 'mgn-stat-success', purple: 'mgn-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mgn-stat-card ${cmap[stat.color]}`}>
      <div className="mgn-stat-content">
        <div className="mgn-stat-icon-wrapper"><Icon className="mgn-stat-icon" /></div>
        <div className="mgn-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ManagerNotificationStatsCard;