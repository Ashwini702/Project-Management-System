// src/components/error/MaintenanceUpdateCard.jsx
import React from 'react';
import { FiCheckCircle, FiRefreshCw, FiClock, FiXCircle } from 'react-icons/fi';

const statusIconMap = {
  'Completed': FiCheckCircle,
  'In Progress': FiRefreshCw,
  'Pending': FiClock,
  'Failed': FiXCircle
};

const statusColorMap = {
  'Completed': 'var(--success-color)',
  'In Progress': 'var(--primary-color)',
  'Pending': 'var(--warning-color)',
  'Failed': 'var(--danger-color)'
};

const MaintenanceUpdateCard = ({ time, title, description, status }) => {
  const StatusIcon = statusIconMap[status] || FiClock;
  const statusColor = statusColorMap[status] || 'var(--text-muted)';

  return (
    <div className="maint-update-card">
      <div className="maint-update-time">
        <span>{time}</span>
      </div>
      <div className="maint-update-dot" style={{ backgroundColor: statusColor }}>
        <StatusIcon style={{ color: '#fff', fontSize: '0.6rem' }} />
      </div>
      <div className="maint-update-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MaintenanceUpdateCard;