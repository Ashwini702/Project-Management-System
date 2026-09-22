// src/components/managerDeadlines/DeadlineFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { deadlineTypes, projectsForDeadlines, tasksForDeadlines, assigneesForDeadlines } from '../../data/managerDeadlinesData';

const DeadlineFormModal = ({ show, onClose, onSubmit, editDeadline }) => {
  const initial = { title: '', description: '', type: 'Task Deadline', project: '', relatedTask: '', assignee: '', dueDate: '', dueTime: '', priority: 'Medium', status: 'Upcoming', progress: 0, reminder: '1 Hour Before', notes: '' };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editDeadline) setFormData({ title: editDeadline.title || '', description: editDeadline.description || '', type: editDeadline.type || 'Task Deadline', project: editDeadline.project || '', relatedTask: editDeadline.relatedTask || '', assignee: editDeadline.assignee || '', dueDate: editDeadline.dueDate || '', dueTime: editDeadline.dueTime || '', priority: editDeadline.priority || 'Medium', status: editDeadline.status || 'Upcoming', progress: editDeadline.progress || 0, reminder: editDeadline.reminder || '1 Hour Before', notes: editDeadline.notes || '' });
    else setFormData(initial);
    setErrors({});
  }, [editDeadline, show]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.type) e.type = 'Type is required';
    if (!formData.project) e.project = 'Project is required';
    if (!formData.assignee) e.assignee = 'Assignee is required';
    if (!formData.dueDate) e.dueDate = 'Due date is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(formData); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{editDeadline ? 'Edit Deadline' : 'Add Deadline'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-12 mb-3"><label className="form-label">Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Type *</label><select name="type" className={`form-select ${errors.type ? 'is-invalid' : ''}`} value={formData.type} onChange={handleChange}>{deadlineTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.type && <div className="invalid-feedback">{errors.type}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="project" className={`form-select ${errors.project ? 'is-invalid' : ''}`} value={formData.project} onChange={handleChange}><option value="">Select</option>{projectsForDeadlines.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.project && <div className="invalid-feedback">{errors.project}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Related Task</label><select name="relatedTask" className="form-select" value={formData.relatedTask} onChange={handleChange}><option value="">None</option>{tasksForDeadlines.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Assignee *</label><select name="assignee" className={`form-select ${errors.assignee ? 'is-invalid' : ''}`} value={formData.assignee} onChange={handleChange}><option value="">Select</option>{assigneesForDeadlines.map(a => <option key={a} value={a}>{a}</option>)}</select>{errors.assignee && <div className="invalid-feedback">{errors.assignee}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Due Date *</label><input type="date" name="dueDate" className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`} value={formData.dueDate} onChange={handleChange} />{errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Due Time</label><input type="time" name="dueTime" className="form-control" value={formData.dueTime} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Progress (%)</label><input type="number" name="progress" className="form-control" min="0" max="100" value={formData.progress} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Reminder</label><select name="reminder" className="form-select" value={formData.reminder} onChange={handleChange}><option>No Reminder</option><option>10 Minutes Before</option><option>30 Minutes Before</option><option>1 Hour Before</option><option>1 Day Before</option><option>2 Days Before</option></select></div>
        <div className="col-md-12 mb-3"><label className="form-label">Notes</label><textarea name="notes" className="form-control" rows="2" value={formData.notes} onChange={handleChange}></textarea></div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editDeadline ? 'Update' : 'Save'}</button></div></form>
    </div></div></div>
  );
};
export default DeadlineFormModal;