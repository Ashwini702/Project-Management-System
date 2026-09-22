// src/components/managerProfile/ManagerProfileStatsCard.jsx
import React from 'react';
import { FiFolder, FiCheckCircle, FiCheckSquare, FiUsers, FiSmile, FiTrendingUp } from 'react-icons/fi';
const iconMap = { FiFolder, FiCheckCircle, FiCheckSquare, FiUsers, FiSmile, FiTrendingUp };

const ManagerProfileStatsCard = ({ stat }) => {
  const cmap = { primary: 'mp-stat-primary', success: 'mp-stat-success', info: 'mp-stat-info', warning: 'mp-stat-warning', purple: 'mp-stat-purple', danger: 'mp-stat-danger' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mp-stat-card ${cmap[stat.color]}`}>
      <div className="mp-stat-content">
        <div className="mp-stat-icon-wrapper"><Icon className="mp-stat-icon" /></div>
        <div className="mp-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ManagerProfileStatsCard;