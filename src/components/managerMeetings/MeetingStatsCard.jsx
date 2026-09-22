// src/components/managerMeetings/MeetingStatsCard.jsx
import React from 'react';
import { FiVideo, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiUsers } from 'react-icons/fi';
const iconMap = { FiVideo, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiUsers };

const MeetingStatsCard = ({ stat }) => {
  const cmap = { primary: 'mmt-stat-primary', info: 'mmt-stat-info', warning: 'mmt-stat-warning', success: 'mmt-stat-success', danger: 'mmt-stat-danger', purple: 'mmt-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mmt-stat-card ${cmap[stat.color]}`}>
      <div className="mmt-stat-content">
        <div className="mmt-stat-icon-wrapper"><Icon className="mmt-stat-icon" /></div>
        <div className="mmt-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default MeetingStatsCard;