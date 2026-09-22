// src/components/teamAttendance/AttendanceStatsCard.jsx
import React from 'react';
import { FiCheckCircle, FiXCircle, FiClock, FiCalendar, FiTrendingUp, FiAward } from 'react-icons/fi';
const iconMap = { FiCheckCircle, FiXCircle, FiClock, FiCalendar, FiTrendingUp, FiAward };

const AttendanceStatsCard = ({ stat }) => {
  const cmap = { success: 'ta-stat-success', danger: 'ta-stat-danger', warning: 'ta-stat-warning', info: 'ta-stat-info', primary: 'ta-stat-primary', purple: 'ta-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`ta-stat-card ${cmap[stat.color]}`}>
      <div className="ta-stat-content">
        <div className="ta-stat-icon-wrapper"><Icon className="ta-stat-icon" /></div>
        <div className="ta-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default AttendanceStatsCard;