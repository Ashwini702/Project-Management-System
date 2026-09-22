// src/components/backup/BackupCard.jsx
import React from 'react';
import { FiEye, FiDownload, FiRefreshCw, FiTrash2, FiHardDrive, FiClock, FiUser } from 'react-icons/fi';
import BackupStatusBadge from './BackupStatusBadge';
import BackupTypeBadge from './BackupTypeBadge';

const BackupCard = ({ backup, onView, onDownload, onRestore, onDelete }) => (
  <div className="backup-card">
    <div className="bkp-card-header">
      <BackupTypeBadge type={backup.type} />
      <BackupStatusBadge status={backup.status} />
    </div>
    <h6 className="bkp-card-title">{backup.name}</h6>
    <div className="bkp-card-meta">
      <span><FiHardDrive /> {backup.size}</span>
      <span><FiUser /> {backup.createdBy}</span>
      <span><FiClock /> {backup.createdAt}</span>
    </div>
    <div className="bkp-card-location"><strong>Location:</strong> {backup.storageLocation}</div>
    <div className="bkp-card-actions">
      <button className="bkp-btn" onClick={() => onView(backup)}><FiEye /></button>
      <button className="bkp-btn" onClick={() => onDownload(backup)}><FiDownload /></button>
      <button className="bkp-btn" onClick={() => onRestore(backup)}><FiRefreshCw /></button>
      <button className="bkp-btn" onClick={() => onDelete(backup)}><FiTrash2 /></button>
    </div>
  </div>
);

export default BackupCard;