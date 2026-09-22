// src/components/clientMessages/ClientMessageStatsCard.jsx
import React from 'react';
import { FiMail, FiMessageCircle, FiFolder, FiHelpCircle, FiFileText, FiMessageSquare } from 'react-icons/fi';
const iconMap = { FiMail, FiMessageCircle, FiFolder, FiHelpCircle, FiFileText, FiMessageSquare };

const ClientMessageStatsCard = ({ stat }) => {
  const cmap = { primary: 'cmsg-stat-primary', warning: 'cmsg-stat-warning', info: 'cmsg-stat-info', danger: 'cmsg-stat-danger', success: 'cmsg-stat-success', purple: 'cmsg-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`cmsg-stat-card ${cmap[stat.color]}`}>
      <div className="cmsg-stat-content">
        <div className="cmsg-stat-icon-wrapper"><Icon className="cmsg-stat-icon" /></div>
        <div className="cmsg-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ClientMessageStatsCard;