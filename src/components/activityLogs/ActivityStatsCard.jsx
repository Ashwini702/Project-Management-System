// src/components/activityLogs/ActivityStatsCard.jsx
import React from 'react';
import { FiActivity, FiClock, FiLogIn, FiFolder, FiCheckSquare, FiShield } from 'react-icons/fi';

const iconMap = { FiActivity, FiClock, FiLogIn, FiFolder, FiCheckSquare, FiShield };

const ActivityStatsCard = ({ stat }) => {
  const cmap = { primary: 'act-stat-primary', info: 'act-stat-info', warning: 'act-stat-warning', success: 'act-stat-success', purple: 'act-stat-purple', danger: 'act-stat-danger' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`act-stat-card ${cmap[stat.color]}`}>
      <div className="act-stat-content">
        <div className="act-stat-icon-wrapper"><Icon className="act-stat-icon" /></div>
        <div className="act-stat-info"><h3 className="act-stat-value">{stat.value}</h3><p className="act-stat-title">{stat.title}</p><span className="act-stat-desc">{stat.description}</span></div>
      </div>
    </div>
  );
};

export default ActivityStatsCard;