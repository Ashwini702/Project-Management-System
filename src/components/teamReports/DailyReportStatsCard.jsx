// src/components/teamReports/DailyReportStatsCard.jsx
import React from 'react';
import { FiEdit3, FiCalendar, FiClock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
const iconMap = { FiEdit3, FiCalendar, FiClock, FiCheckCircle, FiClock, FiTrendingUp };

const DailyReportStatsCard = ({ stat }) => {
  const cmap = { primary: 'tdr-stat-primary', info: 'tdr-stat-info', warning: 'tdr-stat-warning', success: 'tdr-stat-success', purple: 'tdr-stat-purple', danger: 'tdr-stat-danger' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`tdr-stat-card ${cmap[stat.color]}`}>
      <div className="tdr-stat-content">
        <div className="tdr-stat-icon-wrapper"><Icon className="tdr-stat-icon" /></div>
        <div className="tdr-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default DailyReportStatsCard;