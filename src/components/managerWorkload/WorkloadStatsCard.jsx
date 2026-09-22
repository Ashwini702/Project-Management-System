// src/components/managerWorkload/WorkloadStatsCard.jsx
import React from 'react';
import { FiUsers, FiUserCheck, FiUser, FiAlertTriangle, FiCheckSquare, FiTrendingUp } from 'react-icons/fi';
const iconMap = { FiUsers, FiUserCheck, FiUser, FiAlertTriangle, FiCheckSquare, FiTrendingUp };

const WorkloadStatsCard = ({ stat }) => {
  const cmap = { primary: 'mwl-stat-primary', success: 'mwl-stat-success', info: 'mwl-stat-info', danger: 'mwl-stat-danger', warning: 'mwl-stat-warning', purple: 'mwl-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mwl-stat-card ${cmap[stat.color]}`}>
      <div className="mwl-stat-content">
        <div className="mwl-stat-icon-wrapper"><Icon className="mwl-stat-icon" /></div>
        <div className="mwl-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default WorkloadStatsCard;