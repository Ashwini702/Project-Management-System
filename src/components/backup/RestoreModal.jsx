import React, { useEffect, useState } from 'react';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

const RestoreModal = ({ show, onClose, onSubmit, backups = [], selectedBackup = null }) => {
  const [formData, setFormData] = useState({ backupId: '', restoreType: 'Full Restore', notes: '', confirmed: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) setFormData(p => ({ ...p, backupId: selectedBackup ? String(selectedBackup.id) : '' }));
  }, [show, selectedBackup]);

  const validate = () => {
    const e = {};
    if (!formData.backupId) e.backupId = 'Please select a backup';
    if (!formData.restoreType) e.restoreType = 'Restore type is required';
    if (!formData.confirmed) e.confirmed = 'You must confirm the restore';
    setErrors(e); return Object.keys(e).length === 0;
  };
  const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(formData); };
  const isRestorable = (backup) => backup.status === 'Completed' || backup.status === 'Restored';

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Restore Data</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="alert alert-warning"><FiAlertTriangle /> This action records a restore operation. It does not overwrite the live database automatically.</div>
        <div className="mb-3"><label className="form-label">Select Backup *</label><select name="backupId" className={`form-select ${errors.backupId ? 'is-invalid' : ''}`} value={formData.backupId} onChange={handleChange}><option value="">Select a backup</option>{backups.map(b => <option key={b.id} value={b.id} disabled={!isRestorable(b)}>{b.name} — {b.status} ({b.createdAt})</option>)}</select>{backups.length === 0 && <div className="form-text text-warning">No backup records found. Create a backup first.</div>}{backups.length > 0 && !backups.some(isRestorable) && <div className="form-text text-warning">No completed backup is available yet. Scheduled or failed backups cannot be restored.</div>}{errors.backupId && <div className="invalid-feedback">{errors.backupId}</div>}</div>
        <div className="mb-3"><label className="form-label">Restore Type *</label><select name="restoreType" className={`form-select ${errors.restoreType ? 'is-invalid' : ''}`} value={formData.restoreType} onChange={handleChange}><option>Full Restore</option><option>Project Data Only</option><option>User Data Only</option><option>Client Data Only</option><option>Reports Only</option><option>Files Only</option></select>{errors.restoreType && <div className="invalid-feedback">{errors.restoreType}</div>}</div>
        <div className="mb-3"><label className="form-label">Notes</label><textarea name="notes" className="form-control" rows="2" value={formData.notes} onChange={handleChange}></textarea></div>
        <div className="form-check"><input type="checkbox" className="form-check-input" name="confirmed" checked={formData.confirmed} onChange={handleChange} /><label className="form-check-label">I confirm this restore operation.</label>{errors.confirmed && <div className="invalid-feedback d-block">{errors.confirmed}</div>}</div>
      </div><div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-warning">Restore Data</button></div></form>
    </div></div></div>
  );
};
export default RestoreModal;

