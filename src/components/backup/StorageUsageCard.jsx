// src/components/backup/StorageUsageCard.jsx
import React from 'react';
import { FiHardDrive, FiAlertCircle } from 'react-icons/fi';

const StorageUsageCard = ({ storageData }) => {
  const usagePercent = storageData.usedStorage;
  const getStatusColor = () => usagePercent >= 90 ? 'var(--danger-color)' : usagePercent >= 70 ? 'var(--warning-color)' : 'var(--success-color)';
  const getStatusText = () => usagePercent >= 90 ? 'Critical' : usagePercent >= 70 ? 'Near Limit' : 'Healthy';

  return (
    <div className="storage-usage-card">
      <div className="storage-overview">
        <div className="storage-ring">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--card-color)" strokeWidth="12" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={getStatusColor()} strokeWidth="12" strokeDasharray={`${usagePercent * 3.14} 314`} strokeLinecap="round" transform="rotate(-90 60 60)" />
          </svg>
          <div className="storage-ring-text">
            <span className="storage-percent">{usagePercent}%</span>
            <span className="storage-status" style={{ color: getStatusColor() }}>{getStatusText()}</span>
          </div>
        </div>
        <div className="storage-details">
          <div className="storage-detail-item"><span>Total Storage</span><strong>100 GB</strong></div>
          <div className="storage-detail-item"><span>Used</span><strong className="text-primary">68 GB</strong></div>
          <div className="storage-detail-item"><span>Available</span><strong className="text-success">32 GB</strong></div>
        </div>
      </div>
      <div className="storage-breakdown">
        <h6>Storage Breakdown</h6>
        {storageData.breakdown.map((item, i) => (
          <div key={i} className="breakdown-row">
            <div className="breakdown-label"><span className="breakdown-dot" style={{ backgroundColor: item.color }}></span>{item.label}</div>
            <div className="breakdown-bar-wrapper"><div className="breakdown-bar" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div></div>
            <span className="breakdown-value">{item.value} GB</span>
          </div>
        ))}
      </div>
      <button className="btn btn-outline-danger btn-sm mt-3 w-100" onClick={() => alert('Clean Storage is frontend demo only.')}><FiAlertCircle /> Clean Storage</button>
    </div>
  );
};

export default StorageUsageCard;