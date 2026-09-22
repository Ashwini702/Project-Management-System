// src/components/error/FeaturePreviewCard.jsx
import React from 'react';

const statusColorMap = {
  'Planned': 'var(--warning-color)',
  'In Progress': 'var(--primary-color)',
  'Testing': 'var(--accent-purple)',
  'Coming Soon': 'var(--success-color)'
};

const FeaturePreviewCard = ({ icon: Icon, title, description, status }) => {
  const statusColor = statusColorMap[status] || 'var(--text-muted)';

  return (
    <div className="cs-feature-card">
      <div className="cs-feature-card-header">
        <div className="cs-feature-card-icon">
          <Icon />
        </div>
        <span className="cs-feature-badge" style={{ backgroundColor: statusColor + '15', color: statusColor }}>
          {status}
        </span>
      </div>
      <h6 className="cs-feature-card-title">{title}</h6>
      <p className="cs-feature-card-desc">{description}</p>
    </div>
  );
};

export default FeaturePreviewCard;