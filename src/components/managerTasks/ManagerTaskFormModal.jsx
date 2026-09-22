// src/components/managerTasks/ManagerTaskFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { projectsForManager, teamMembersForManager } from '../../data/managerTasksData';

const ManagerTaskFormModal = ({ show, onClose, onSubmit, editTask, projects = projectsForManager, teamMembers = teamMembersForManager }) => {
  const initial = { title: '', description: '', project: '', assignee: '', startDate: '', deadline: '', priority: 'Medium', status: 'Pending', progress: 0, estimatedHours: '' };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTask) setFormData({ title: editTask.title || '', description: editTask.description || '', project: editTask.project || '', assignee: editTask.assignee || '', startDate: editTask.startDate || '', deadline: editTask.deadline || '', priority: editTask.priority || 'Medium', status: editTask.status || 'Pending', progress: editTask.progress || 0, estimatedHours: editTask.estimatedHours || '' });
    else setFormData(initial);
    setErrors({});
  }, [editTask, show]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.project) e.project = 'Project is required';
    if (!formData.assignee) e.assignee = 'Assignee is required';
    if (!formData.startDate) e.startDate = 'Start date is required';
    if (!formData.deadline) e.deadline = 'Deadline is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(formData); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{editTask ? 'Edit Task' : 'Create Task'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-12 mb-3"><label className="form-label">Task Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="project" className={`form-select ${errors.project ? 'is-invalid' : ''}`} value={formData.project} onChange={handleChange}><option value="">Select</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.project && <div className="invalid-feedback">{errors.project}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Assign To *</label><select name="assignee" className={`form-select ${errors.assignee ? 'is-invalid' : ''}`} value={formData.assignee} onChange={handleChange}><option value="">Select</option>{teamMembers.map(m => <option key={m} value={m}>{m}</option>)}</select>{errors.assignee && <div className="invalid-feedback">{errors.assignee}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Start Date *</label><input type="date" name="startDate" className={`form-control ${errors.startDate ? 'is-invalid' : ''}`} value={formData.startDate} onChange={handleChange} />{errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Deadline *</label><input type="date" name="deadline" className={`form-control ${errors.deadline ? 'is-invalid' : ''}`} value={formData.deadline} onChange={handleChange} />{errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Progress (%)</label><input type="number" name="progress" className="form-control" min="0" max="100" value={formData.progress} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Est. Hours</label><input type="number" name="estimatedHours" className="form-control" value={formData.estimatedHours} onChange={handleChange} /></div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editTask ? 'Update' : 'Save'}</button></div></form>
    </div></div></div>
  );
};

export default ManagerTaskFormModal;