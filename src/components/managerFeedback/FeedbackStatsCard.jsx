// src/components/managerFeedback/FeedbackStatsCard.jsx
import React from 'react';
import { FiMessageSquare, FiClock, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiSmile } from 'react-icons/fi';
const iconMap = { FiMessageSquare, FiClock, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiSmile };

const FeedbackStatsCard = ({ stat }) => {
  const cmap = { primary: 'mfb-stat-primary', warning: 'mfb-stat-warning', success: 'mfb-stat-success', info: 'mfb-stat-info', danger: 'mfb-stat-danger', purple: 'mfb-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`mfb-stat-card ${cmap[stat.color]}`}>
      <div className="mfb-stat-content">
        <div className="mfb-stat-icon-wrapper"><Icon className="mfb-stat-icon" /></div>
        <div className="mfb-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default FeedbackStatsCard;