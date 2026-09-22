// src/components/tasks/TaskFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi';
import { projectsForTasks, assigneesList } from '../../data/taskData';
import FileUploadField from '../common/FileUploadField';

const TaskFormModal = ({ show, onClose, onSubmit, editTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignee: '',
    startDate: '',
    deadline: '',
    priority: 'Medium',
    status: 'Pending',
    progress: 0,
    estimatedHours: '', attachment: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        project: editTask.project || '',
        assignee: editTask.assignee || '',
        startDate: editTask.startDate || '',
        deadline: editTask.deadline || '',
        priority: editTask.priority || 'Medium',
        status: editTask.status || 'Pending',
        progress: editTask.progress || 0,
        estimatedHours: editTask.estimatedHours || '', attachment: editTask.attachment || null
      });
    } else {
      setFormData({
        title: '', description: '', project: '', assignee: '',
        startDate: '', deadline: '', priority: 'Medium', status: 'Pending',
        progress: 0, estimatedHours: '', attachment: null
      });
    }
    setErrors({});
  }, [editTask, show]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.project) newErrors.project = 'Project is required';
    if (!formData.assignee) newErrors.assignee = 'Assignee is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay task-form-overlay dashboard-form-overlay">
      <div className="modal-dialog task-form-dialog dashboard-form-dialog">
        <div className="modal-content task-form-modal dashboard-form-modal">
          <div className="modal-header task-form-header dashboard-form-header">
            <div>
              <h5 className="modal-title">{editTask ? 'Edit Task' : 'Create New Task'}</h5>
              <p className="task-form-subtitle">Assign work, timeline, and ownership in one place.</p>
            </div>
            <button type="button" className="modal-close-btn task-form-close" onClick={onClose}><FiX /></button>
          </div>
          <form className="task-form dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-body task-form-body dashboard-form-body">
              <div className="row task-form-grid dashboard-form-grid">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Task Title *</label>
                  <input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} placeholder="Enter task title" />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} placeholder="Enter task description"></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Project *</label>
                  <select name="project" className={`form-select ${errors.project ? 'is-invalid' : ''}`} value={formData.project} onChange={handleChange}>
                    <option value="">Select Project</option>
                    {projectsForTasks.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.project && <div className="invalid-feedback">{errors.project}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Assign To *</label>
                  <select name="assignee" className={`form-select ${errors.assignee ? 'is-invalid' : ''}`} value={formData.assignee} onChange={handleChange}>
                    <option value="">Select Assignee</option>
                    {assigneesList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  {errors.assignee && <div className="invalid-feedback">{errors.assignee}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Start Date *</label>
                  <input type="date" name="startDate" className={`form-control ${errors.startDate ? 'is-invalid' : ''}`} value={formData.startDate} onChange={handleChange} />
                  {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Deadline *</label>
                  <input type="date" name="deadline" className={`form-control ${errors.deadline ? 'is-invalid' : ''}`} value={formData.deadline} onChange={handleChange} />
                  {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Estimated Hours</label>
                  <input type="number" name="estimatedHours" className="form-control" value={formData.estimatedHours} onChange={handleChange} placeholder="e.g., 40" />
                </div>
                <div className="col-md-12 mb-3 task-document-field"><label className="form-label">Upload Task Document</label><FileUploadField name="attachment" title="Upload Task Document" hint="Supports PDF, DOCX, XLSX, PNG (Max 10MB)" accept=".pdf,.doc,.docx,.xls,.xlsx,image/png,image/jpeg" maxSizeMB={10} onFileSelect={(file) => setFormData(prev => ({ ...prev, attachment: file }))} /></div>
              </div>
            </div>
            <div className="modal-footer task-form-footer dashboard-form-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editTask ? 'Update Task' : 'Save Task'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
