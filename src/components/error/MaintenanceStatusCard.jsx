// src/components/error/MaintenanceStatusCard.jsx
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

const MaintenanceStatusCard = ({ icon: Icon, title, status, description }) => {
  const StatusIcon = statusIconMap[status] || FiClock;
  const statusColor = statusColorMap[status] || 'var(--text-muted)';

  return (
    <div className="maint-status-card">
      <div className="maint-status-card-header">
        <div className="maint-status-card-icon">
          <Icon />
        </div>
        <div className="maint-status-badge" style={{ backgroundColor: statusColor + '15', color: statusColor }}>
          <StatusIcon className="me-1" style={{ fontSize: '0.7rem' }} />
          {status}
        </div>
      </div>
      <h6 className="maint-status-card-title">{title}</h6>
      <p className="maint-status-card-desc">{description}</p>
    </div>
  );
};

export default MaintenanceStatusCard;