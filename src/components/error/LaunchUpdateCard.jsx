// src/components/error/LaunchUpdateCard.jsx
import React from 'react';
import { FiCheckCircle, FiRefreshCw, FiClock } from 'react-icons/fi';

const statusIconMap = {
  'Completed': FiCheckCircle,
  'In Progress': FiRefreshCw,
  'Pending': FiClock
};

const statusColorMap = {
  'Completed': 'var(--success-color)',
  'In Progress': 'var(--primary-color)',
  'Pending': 'var(--warning-color)'
};

const LaunchUpdateCard = ({ date, title, description, status }) => {
  const StatusIcon = statusIconMap[status] || FiClock;
  const statusColor = statusColorMap[status] || 'var(--text-muted)';

  return (
    <div className="cs-launch-card">
      <div className="cs-launch-time">
        <span>{date}</span>
      </div>
      <div className="cs-launch-dot" style={{ backgroundColor: statusColor }}>
        <StatusIcon style={{ color: '#fff', fontSize: '0.6rem' }} />
      </div>
      <div className="cs-launch-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LaunchUpdateCard;