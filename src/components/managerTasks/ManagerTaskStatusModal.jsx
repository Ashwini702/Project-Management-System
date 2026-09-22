// src/components/managerTasks/ManagerTaskStatusModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const ManagerTaskStatusModal = ({ show, onClose, onSubmit, task }) => {
  const [form, setForm] = useState({ status: '', progress: 0, note: '' });

  useEffect(() => {
    if (task) setForm({ status: task.status, progress: task.progress, note: '' });
  }, [task, show]);

  const handleSubmit = (e) => { e.preventDefault(); if (form.status) onSubmit(form); };

  if (!show || !task) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Update Status: {task.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Reopened</option><option>Blocked</option><option>Cancelled</option></select></div>
        <div className="mb-3"><label className="form-label">Progress (%)</label><input type="number" className="form-control" min="0" max="100" value={form.progress} onChange={(e) => setForm(p => ({ ...p, progress: Number(e.target.value) }))} /></div>
        <div className="mb-3"><label className="form-label">Note</label><textarea className="form-control" rows="2" value={form.note} onChange={(e) => setForm(p => ({ ...p, note: e.target.value }))}></textarea></div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div></form>
    </div></div></div>
  );
};

export default ManagerTaskStatusModal;