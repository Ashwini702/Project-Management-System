// src/components/meetings/MeetingStatsCard.jsx
import React from 'react';
import { FiVideo, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiUsers } from 'react-icons/fi';
const iconMap = { FiVideo, FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiUsers };
const MeetingStatsCard = ({ stat }) => {
  const colorMap = { primary: 'mtg-stat-primary', info: 'mtg-stat-info', warning: 'mtg-stat-warning', success: 'mtg-stat-success', danger: 'mtg-stat-danger', purple: 'mtg-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mtg-stat-card ${colorMap[stat.color]}`}>
      <div className="mtg-stat-content">
        <div className="mtg-stat-icon-wrapper"><Icon className="mtg-stat-icon" /></div>
        <div className="mtg-stat-info"><h3 className="mtg-stat-value">{stat.value}</h3><p className="mtg-stat-title">{stat.title}</p><span className="mtg-stat-desc">{stat.description}</span></div>
      </div>
    </div>
  );
};
export default MeetingStatsCard;