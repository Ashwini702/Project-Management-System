// src/components/error/ErrorStatusCard.jsx
import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiRefreshCw, FiClock } from 'react-icons/fi';

const statusIconMap = {
  'Operational': FiCheckCircle,
  'Temporary Error': FiAlertTriangle,
  'Unavailable': FiXCircle,
  'Checking': FiRefreshCw,
  'Failed': FiXCircle,
  'Available': FiCheckCircle
};

const statusColorMap = {
  'Operational': 'var(--success-color)',
  'Temporary Error': 'var(--warning-color)',
  'Unavailable': 'var(--danger-color)',
  'Checking': 'var(--primary-color)',
  'Failed': 'var(--danger-color)',
  'Available': 'var(--success-color)'
};

const ErrorStatusCard = ({ icon: Icon, title, status, description, onClick }) => {
  const StatusIcon = statusIconMap[status] || FiClock;
  const statusColor = statusColorMap[status] || 'var(--text-muted)';

  return (
    <div className="se-status-card" onClick={onClick}>
      <div className="se-status-card-header">
        <div className="se-status-card-icon">
          <Icon />
        </div>
        <div className="se-status-badge" style={{ backgroundColor: statusColor + '15', color: statusColor }}>
          <StatusIcon className="me-1" style={{ fontSize: '0.7rem' }} />
          {status}
        </div>
      </div>
      <h6 className="se-status-card-title">{title}</h6>
      <p className="se-status-card-desc">{description}</p>
    </div>
  );
};

export default ErrorStatusCard;