// src/components/teamDeadlines/TeamDeadlineReminderModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const TeamDeadlineReminderModal = ({ show, onClose, deadline, onSubmit }) => {
  const [form, setForm] = useState({ reminderDate: '', reminderTime: '09:00', reminderType: 'System Notification', note: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => { if (deadline) setForm({ reminderDate: deadline.reminderDate || '', reminderTime: deadline.reminderTime || '09:00', reminderType: 'System Notification', note: '' }); }, [deadline, show]);

  const validate = () => {
    const e = {};
    if (!form.reminderDate) e.reminderDate = 'Required';
    if (!form.reminderTime) e.reminderTime = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(deadline.id, form); };

  if (!show || !deadline) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Set Reminder - {deadline.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Due Date</label><input type="text" className="form-control" value={deadline.dueDate} readOnly /></div>
        <div className="mb-3"><label className="form-label">Reminder Date *</label><input type="date" className={`form-control ${errors.reminderDate ? 'is-invalid' : ''}`} value={form.reminderDate} onChange={(e) => setForm(p => ({ ...p, reminderDate: e.target.value }))} />{errors.reminderDate && <div className="invalid-feedback">{errors.reminderDate}</div>}</div>
        <div className="mb-3"><label className="form-label">Reminder Time *</label><input type="time" className={`form-control ${errors.reminderTime ? 'is-invalid' : ''}`} value={form.reminderTime} onChange={(e) => setForm(p => ({ ...p, reminderTime: e.target.value }))} />{errors.reminderTime && <div className="invalid-feedback">{errors.reminderTime}</div>}</div>
        <div className="mb-3"><label className="form-label">Reminder Type</label><select className="form-select" value={form.reminderType} onChange={(e) => setForm(p => ({ ...p, reminderType: e.target.value }))}><option>System Notification</option><option>Email Reminder</option><option>WhatsApp Reminder</option></select></div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Save Reminder</button></div></form>
    </div></div></div>
  );
};
export default TeamDeadlineReminderModal;