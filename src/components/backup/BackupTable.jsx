// src/components/backup/BackupTable.jsx
import React from 'react';
import { FiEye, FiDownload, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import BackupStatusBadge from './BackupStatusBadge';
import BackupTypeBadge from './BackupTypeBadge';

const BackupTable = ({ backups, onView, onDownload, onRestore, onDelete }) => (
  <div className="table-responsive">
    <table className="table bkp-table">
      <thead><tr><th>Backup Name</th><th>Type</th><th>Size</th><th>Status</th><th>Created By</th><th>Created At</th><th>Location</th><th>Actions</th></tr></thead>
      <tbody>
        {backups.length === 0 ? <tr><td colSpan="8" className="text-center py-5"><p className="text-muted">No backups found</p></td></tr> :
          backups.map(b => (
            <tr key={b.id} className={b.status === 'Failed' ? 'row-failed' : ''}>
              <td><span className="bkp-name">{b.name}</span></td>
              <td><BackupTypeBadge type={b.type} /></td><td>{b.size}</td>
              <td><BackupStatusBadge status={b.status} /></td><td>{b.createdBy}</td>
              <td>{b.createdAt}</td><td>{b.storageLocation}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(b)}><FiEye /></button>
                <button className="action-btn-icon down-btn" onClick={() => onDownload(b)}><FiDownload /></button>
                <button className="action-btn-icon restore-btn" onClick={() => onRestore(b)}><FiRefreshCw /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(b)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default BackupTable;