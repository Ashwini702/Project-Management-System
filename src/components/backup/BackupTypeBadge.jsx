// src/components/backup/BackupTypeBadge.jsx
import React from 'react';
const BackupTypeBadge = ({ type }) => {
  const map = { 'Full Database Backup': 'bkp-type-full', 'Project Data Backup': 'bkp-type-project', 'User Data Backup': 'bkp-type-user', 'Client Data Backup': 'bkp-type-client', 'Reports Backup': 'bkp-type-report', 'Files Backup': 'bkp-type-files' };
  return <span className={`backup-type-badge ${map[type] || ''}`}>{type}</span>;
};
export default BackupTypeBadge;