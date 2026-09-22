// src/components/notifications/NotificationFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { notificationTypes, recipientRoles, projectsForNotif, tasksForNotif, channels, priorities, statuses } from '../../data/notificationData';

const NotificationFormModal = ({ show, onClose, onSubmit, editNotif, preselectedType, composeDefaults = {}, users = [] }) => {
  const initial = { title: '', message: '', type: preselectedType || 'Project Assigned', recipientRole: 'All Users', recipientUser: 'All', relatedProject: '', relatedTask: '', channels: ['System'], priority: 'Medium', status: 'Sent', scheduledAt: '' };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editNotif) setFormData({ title: editNotif.title || '', message: editNotif.message || '', type: editNotif.type || 'Project Assigned', recipientRole: editNotif.recipientRole || 'All Users', recipientUser: editNotif.recipientUser || 'All', relatedProject: editNotif.relatedProject || '', relatedTask: editNotif.relatedTask || '', channels: editNotif.channels || ['System'], priority: editNotif.priority || 'Medium', status: editNotif.status || 'Sent', scheduledAt: editNotif.scheduledAt || '' });
    else setFormData({ ...initial, ...composeDefaults, type: composeDefaults.type || preselectedType || 'Project Assigned' });
    setErrors({});
  }, [editNotif, show, preselectedType, composeDefaults]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.message.trim()) e.message = 'Message is required';
    if (!formData.type) e.type = 'Type is required';
    if (!formData.recipientRole) e.recipientRole = 'Recipient role is required';
    if (formData.channels.length === 0) e.channels = 'At least one channel required';
    if (!formData.priority) e.priority = 'Priority is required';
    if (!formData.status) e.status = 'Status is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const toggleChannel = (ch) => { setFormData(p => ({ ...p, channels: p.channels.includes(ch) ? p.channels.filter(c => c !== ch) : [...p.channels, ch] })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(formData); };

  const selectableUsers = users.filter(user =>
    user.status === 'Active' && (formData.recipientRole === 'All Users' || user.role === formData.recipientRole)
  );

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{editNotif ? 'Edit Notification' : 'Create Notification'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-12 mb-3"><label className="form-label">Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Message *</label><textarea name="message" className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="3" value={formData.message} onChange={handleChange}></textarea>{errors.message && <div className="invalid-feedback">{errors.message}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Type *</label><select name="type" className={`form-select ${errors.type ? 'is-invalid' : ''}`} value={formData.type} onChange={handleChange}>{notificationTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.type && <div className="invalid-feedback">{errors.type}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Recipient Role *</label><select name="recipientRole" className={`form-select ${errors.recipientRole ? 'is-invalid' : ''}`} value={formData.recipientRole} onChange={handleChange}>{recipientRoles.map(r => <option key={r} value={r}>{r}</option>)}</select>{errors.recipientRole && <div className="invalid-feedback">{errors.recipientRole}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Recipient User</label><select name="recipientUser" className="form-select" value={formData.recipientUser} onChange={handleChange}><option value="All">All</option>{selectableUsers.map(user => <option key={user.id} value={user.name}>{user.name} ({user.email})</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Related Project</label><select name="relatedProject" className="form-select" value={formData.relatedProject} onChange={handleChange}><option value="">None</option>{projectsForNotif.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Related Task</label><select name="relatedTask" className="form-select" value={formData.relatedTask} onChange={handleChange}><option value="">None</option>{tasksForNotif.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Priority *</label><select name="priority" className={`form-select ${errors.priority ? 'is-invalid' : ''}`} value={formData.priority} onChange={handleChange}>{priorities.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.priority && <div className="invalid-feedback">{errors.priority}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Status *</label><select name="status" className={`form-select ${errors.status ? 'is-invalid' : ''}`} value={formData.status} onChange={handleChange}>{statuses.slice(2).map(s => <option key={s} value={s}>{s}</option>)}</select>{errors.status && <div className="invalid-feedback">{errors.status}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Schedule Date</label><input type="date" name="scheduledAt" className="form-control" value={formData.scheduledAt} onChange={handleChange} /></div>
        <div className="col-md-12 mb-3"><label className="form-label">Channels *</label><div className="channels-select">{channels.map(ch => <div key={ch} className={`channel-chip ${formData.channels.includes(ch) ? 'selected' : ''}`} onClick={() => toggleChannel(ch)}>{ch}</div>)}</div>{errors.channels && <div className="invalid-feedback d-block">{errors.channels}</div>}</div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editNotif ? 'Update' : 'Save'}</button></div></form>
    </div></div></div>
  );
};

export default NotificationFormModal;
