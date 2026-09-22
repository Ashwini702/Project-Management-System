// src/components/teamTasks/TeamTaskUpdateModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const TeamTaskUpdateModal = ({ show, onClose, task, onSubmit }) => {
  const [form, setForm] = useState({ status: '', progress: 0, timeSpent: 0, note: '', blockerReason: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => { if (task) setForm({ status: task.status, progress: task.progress, timeSpent: task.timeSpent, note: '', blockerReason: '' }); }, [task, show]);

  const validate = () => {
    const e = {};
    if (!form.status) e.status = 'Required';
    if (form.progress < 0 || form.progress > 100) e.progress = '0-100';
    if (!form.timeSpent && form.timeSpent !== 0) e.timeSpent = 'Required';
    if (!form.note.trim()) e.note = 'Required';
    if (form.status === 'Blocked' && !form.blockerReason.trim()) e.blockerReason = 'Required when blocked';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(task.id, form); };

  if (!show || !task) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Update: {task.taskTitle}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Task</label><input type="text" className="form-control" value={task.taskTitle} readOnly /></div>
        <div className="mb-3"><label className="form-label">Status *</label><select className={`form-select ${errors.status ? 'is-invalid' : ''}`} value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Blocked</option></select>{errors.status && <div className="invalid-feedback">{errors.status}</div>}</div>
        <div className="mb-3"><label className="form-label">Progress (%) *</label><input type="number" className={`form-control ${errors.progress ? 'is-invalid' : ''}`} min="0" max="100" value={form.progress} onChange={(e) => setForm(p => ({ ...p, progress: Number(e.target.value) }))} />{errors.progress && <div className="invalid-feedback">{errors.progress}</div>}</div>
        <div className="mb-3"><label className="form-label">Time Spent (hours) *</label><input type="number" className={`form-control ${errors.timeSpent ? 'is-invalid' : ''}`} value={form.timeSpent} onChange={(e) => setForm(p => ({ ...p, timeSpent: Number(e.target.value) }))} />{errors.timeSpent && <div className="invalid-feedback">{errors.timeSpent}</div>}</div>
        <div className="mb-3"><label className="form-label">Work Note *</label><textarea className={`form-control ${errors.note ? 'is-invalid' : ''}`} rows="2" value={form.note} onChange={(e) => setForm(p => ({ ...p, note: e.target.value }))}></textarea>{errors.note && <div className="invalid-feedback">{errors.note}</div>}</div>
        {form.status === 'Blocked' && <div className="mb-3"><label className="form-label">Blocker Reason *</label><textarea className={`form-control ${errors.blockerReason ? 'is-invalid' : ''}`} rows="2" value={form.blockerReason} onChange={(e) => setForm(p => ({ ...p, blockerReason: e.target.value }))}></textarea>{errors.blockerReason && <div className="invalid-feedback">{errors.blockerReason}</div>}</div>}
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Save Update</button></div></form>
    </div></div></div>
  );
};
export default TeamTaskUpdateModal;