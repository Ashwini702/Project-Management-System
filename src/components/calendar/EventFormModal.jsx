// src/components/calendar/EventFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { projectsForCalendar, tasksForCalendar, assigneesForCalendar, eventTypes, reminders } from '../../data/calendarData';

const EventFormModal = ({ show, onClose, onSubmit, editEvent, selectedDate }) => {
  const initial = { title: '', description: '', type: 'Meeting', project: '', relatedTask: '', assignedTo: '', date: selectedDate || '', startTime: '09:00', endTime: '10:00', priority: 'Medium', status: 'Upcoming', reminder: '30 Minutes Before', notes: '' };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editEvent) setFormData({ title: editEvent.title || '', description: editEvent.description || '', type: editEvent.type || 'Meeting', project: editEvent.project || '', relatedTask: editEvent.relatedTask || '', assignedTo: editEvent.assignedTo || '', date: editEvent.date || '', startTime: editEvent.startTime || '09:00', endTime: editEvent.endTime || '10:00', priority: editEvent.priority || 'Medium', status: editEvent.status || 'Upcoming', reminder: editEvent.reminder || '30 Minutes Before', notes: editEvent.notes || '' });
    else setFormData({ ...initial, date: selectedDate || '' });
    setErrors({});
  }, [editEvent, show, selectedDate]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.type) e.type = 'Type is required';
    if (!formData.project) e.project = 'Project is required';
    if (!formData.assignedTo) e.assignedTo = 'Assignee is required';
    if (!formData.date) e.date = 'Date is required';
    if (!formData.startTime) e.startTime = 'Start time is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(formData); };

  if (!show) return null;

  return (
    <div className="modal-overlay dashboard-form-overlay"><div className="modal-dialog modal-lg dashboard-form-dialog"><div className="modal-content dashboard-form-modal">
      <div className="modal-header dashboard-form-header"><h5 className="modal-title">{editEvent ? 'Edit Event' : 'Add Event'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form className="dashboard-form" onSubmit={handleSubmit}><div className="modal-body dashboard-form-body"><div className="row dashboard-form-grid">
        <div className="col-md-12 mb-3"><label className="form-label">Event Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Event Type *</label><select name="type" className={`form-select ${errors.type ? 'is-invalid' : ''}`} value={formData.type} onChange={handleChange}>{eventTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.type && <div className="invalid-feedback">{errors.type}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="project" className={`form-select ${errors.project ? 'is-invalid' : ''}`} value={formData.project} onChange={handleChange}><option value="">Select Project</option>{projectsForCalendar.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.project && <div className="invalid-feedback">{errors.project}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Related Task</label><select name="relatedTask" className="form-select" value={formData.relatedTask} onChange={handleChange}><option value="">None</option>{tasksForCalendar.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Assigned To *</label><select name="assignedTo" className={`form-select ${errors.assignedTo ? 'is-invalid' : ''}`} value={formData.assignedTo} onChange={handleChange}><option value="">Select Assignee</option>{assigneesForCalendar.map(a => <option key={a} value={a}>{a}</option>)}</select>{errors.assignedTo && <div className="invalid-feedback">{errors.assignedTo}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Date *</label><input type="date" name="date" className={`form-control ${errors.date ? 'is-invalid' : ''}`} value={formData.date} onChange={handleChange} />{errors.date && <div className="invalid-feedback">{errors.date}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Start Time *</label><input type="time" name="startTime" className={`form-control ${errors.startTime ? 'is-invalid' : ''}`} value={formData.startTime} onChange={handleChange} />{errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">End Time</label><input type="time" name="endTime" className="form-control" value={formData.endTime} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Reminder</label><select name="reminder" className="form-select" value={formData.reminder} onChange={handleChange}>{reminders.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
        <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea></div>
        <div className="col-md-12 mb-3"><label className="form-label">Notes</label><textarea name="notes" className="form-control" rows="2" value={formData.notes} onChange={handleChange}></textarea></div>
      </div></div>
      <div className="modal-footer dashboard-form-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editEvent ? 'Update Event' : 'Save Event'}</button></div></form>
    </div></div></div>
  );
};

export default EventFormModal;