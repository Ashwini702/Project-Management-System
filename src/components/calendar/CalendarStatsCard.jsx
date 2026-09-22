// src/components/calendar/CalendarStatsCard.jsx
import React from 'react';
import { FiCalendar, FiClock, FiVideo, FiFlag, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const iconMap = { FiCalendar, FiClock, FiVideo, FiFlag, FiAlertTriangle, FiCheckCircle };

const CalendarStatsCard = ({ stat }) => {
  const colorMap = { primary: 'cal-stat-primary', warning: 'cal-stat-warning', info: 'cal-stat-info', purple: 'cal-stat-purple', danger: 'cal-stat-danger', success: 'cal-stat-success' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`cal-stat-card ${colorMap[stat.color] || ''}`}>
      <div className="cal-stat-content">
        <div className="cal-stat-icon-wrapper"><Icon className="cal-stat-icon" /></div>
        <div className="cal-stat-info">
          <h3 className="cal-stat-value">{stat.value}</h3>
          <p className="cal-stat-title">{stat.title}</p>
          <span className="cal-stat-desc">{stat.description}</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarStatsCard;