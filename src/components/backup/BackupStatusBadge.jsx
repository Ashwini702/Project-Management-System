// src/components/backup/BackupStatusBadge.jsx
import React from 'react';
const BackupStatusBadge = ({ status }) => {
  const map = { 'Completed': 'bkp-status-completed', 'Failed': 'bkp-status-failed', 'In Progress': 'bkp-status-progress', 'Scheduled': 'bkp-status-scheduled', 'Restored': 'bkp-status-restored' };
  return <span className={`backup-status-badge ${map[status] || ''}`}>{status}</span>;
};
export default BackupStatusBadge;