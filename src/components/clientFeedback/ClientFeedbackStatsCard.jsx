// src/components/clientFeedback/ClientFeedbackStatsCard.jsx
import React from 'react';
import { FiMessageSquare, FiClock, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiStar } from 'react-icons/fi';
const iconMap = { FiMessageSquare, FiClock, FiCheckCircle, FiThumbsUp, FiThumbsDown, FiStar };

const ClientFeedbackStatsCard = ({ stat }) => {
  const cmap = { primary: 'clfb-stat-primary', warning: 'clfb-stat-warning', success: 'clfb-stat-success', info: 'clfb-stat-info', danger: 'clfb-stat-danger', purple: 'clfb-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`clfb-stat-card ${cmap[stat.color]}`}>
      <div className="clfb-stat-content">
        <div className="clfb-stat-icon-wrapper"><Icon className="clfb-stat-icon" /></div>
        <div className="clfb-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ClientFeedbackStatsCard;