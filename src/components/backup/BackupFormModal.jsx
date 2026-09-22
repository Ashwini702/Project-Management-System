// src/components/backup/BackupFormModal.jsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { backupTypes, storageLocations } from '../../data/backupData';

const BackupFormModal = ({ show, onClose, onSubmit }) => {
  const initial = { name: '', type: 'Full Database Backup', description: '', storageLocation: 'Cloud Storage', includeFiles: true, includeReports: false, includeLogs: false, scheduleBackup: false, scheduleDate: '', scheduleTime: '' };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Backup name is required';
    if (!formData.type) e.type = 'Type is required';
    if (!formData.storageLocation) e.storageLocation = 'Location is required';
    if (formData.scheduleBackup && !formData.scheduleDate) e.scheduleDate = 'Schedule date is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(p => ({ ...p, [name]: type === 'checkbox' ? checked : value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) { onSubmit(formData); setFormData(initial); } };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Create Backup</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-12 mb-3"><label className="form-label">Backup Name *</label><input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleChange} />{errors.name && <div className="invalid-feedback">{errors.name}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Backup Type *</label><select name="type" className={`form-select ${errors.type ? 'is-invalid' : ''}`} value={formData.type} onChange={handleChange}>{backupTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.type && <div className="invalid-feedback">{errors.type}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Storage Location *</label><select name="storageLocation" className={`form-select ${errors.storageLocation ? 'is-invalid' : ''}`} value={formData.storageLocation} onChange={handleChange}>{storageLocations.map(l => <option key={l} value={l}>{l}</option>)}</select>{errors.storageLocation && <div className="invalid-feedback">{errors.storageLocation}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea></div>
        <div className="col-md-12 mb-3">
          <label className="form-label">Include Data</label>
          <div className="d-flex gap-3">
            <label className="form-check"><input type="checkbox" className="form-check-input" name="includeFiles" checked={formData.includeFiles} onChange={handleChange} /> Files</label>
            <label className="form-check"><input type="checkbox" className="form-check-input" name="includeReports" checked={formData.includeReports} onChange={handleChange} /> Reports</label>
            <label className="form-check"><input type="checkbox" className="form-check-input" name="includeLogs" checked={formData.includeLogs} onChange={handleChange} /> Activity Logs</label>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-check"><input type="checkbox" className="form-check-input" name="scheduleBackup" checked={formData.scheduleBackup} onChange={handleChange} /> Schedule Backup</label>
        </div>
        {formData.scheduleBackup && (
          <>
            <div className="col-md-6 mb-3"><label className="form-label">Schedule Date *</label><input type="date" name="scheduleDate" className={`form-control ${errors.scheduleDate ? 'is-invalid' : ''}`} value={formData.scheduleDate} onChange={handleChange} />{errors.scheduleDate && <div className="invalid-feedback">{errors.scheduleDate}</div>}</div>
            <div className="col-md-6 mb-3"><label className="form-label">Schedule Time</label><input type="time" name="scheduleTime" className="form-control" value={formData.scheduleTime} onChange={handleChange} /></div>
          </>
        )}
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Create Backup</button></div></form>
    </div></div></div>
  );
};

export default BackupFormModal;