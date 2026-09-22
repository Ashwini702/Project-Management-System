// src/components/teamProfile/TeamProfileStatsCard.jsx
import React from 'react';
import { FiCheckSquare, FiCheckCircle, FiFolder, FiCalendar, FiClock, FiTrendingUp } from 'react-icons/fi';
const iconMap = { FiCheckSquare, FiCheckCircle, FiFolder, FiCalendar, FiClock, FiTrendingUp };

const TeamProfileStatsCard = ({ stat }) => {
  const cmap = { primary: 'tprof-stat-primary', success: 'tprof-stat-success', info: 'tprof-stat-info', warning: 'tprof-stat-warning', purple: 'tprof-stat-purple', danger: 'tprof-stat-danger' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`tprof-stat-card ${cmap[stat.color]}`}>
      <div className="tprof-stat-content">
        <div className="tprof-stat-icon-wrapper"><Icon className="tprof-stat-icon" /></div>
        <div className="tprof-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default TeamProfileStatsCard;