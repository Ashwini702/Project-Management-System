// src/components/clientFeedback/ClientFeedbackFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { categories } from '../../data/clientFeedbackData';
import FileUploadField from '../common/FileUploadField';

const ClientFeedbackFormModal = ({ show, onClose, onSubmit, editFeedback, projects = [] }) => {
  const initial = { projectName: '', title: '', category: 'UI Change', priority: 'Medium', rating: 4, message: '', attachment: null };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editFeedback) setForm({ projectName: editFeedback.projectName || '', title: editFeedback.title || '', category: editFeedback.category || 'UI Change', priority: editFeedback.priority || 'Medium', rating: editFeedback.rating || 4, message: editFeedback.message || '', attachment: editFeedback.attachment || null });
    else setForm(initial);
    setErrors({});
  }, [editFeedback, show]);

  const validate = () => {
    const e = {};
    if (!form.projectName) e.projectName = 'Project is required';
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.priority) e.priority = 'Priority is required';
    if (!form.rating) e.rating = 'Rating is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(form); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{editFeedback ? 'Edit Feedback' : 'Submit Feedback'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="projectName" className={`form-select ${errors.projectName ? 'is-invalid' : ''}`} value={form.projectName} onChange={handleChange}><option value="">Select</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Category *</label><select name="category" className={`form-select ${errors.category ? 'is-invalid' : ''}`} value={form.category} onChange={handleChange}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>{errors.category && <div className="invalid-feedback">{errors.category}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Priority *</label><select name="priority" className={`form-select ${errors.priority ? 'is-invalid' : ''}`} value={form.priority} onChange={handleChange}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>{errors.priority && <div className="invalid-feedback">{errors.priority}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Rating *</label><select name="rating" className={`form-select ${errors.rating ? 'is-invalid' : ''}`} value={form.rating} onChange={handleChange}><option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option></select>{errors.rating && <div className="invalid-feedback">{errors.rating}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={form.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Message *</label><textarea name="message" className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" value={form.message} onChange={handleChange}></textarea>{errors.message && <div className="invalid-feedback">{errors.message}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Attachments</label><FileUploadField className="clfb-upload-field" name="attachment" title="Upload Attachment" hint="Supports PDF, PNG, JPG (Max 5MB)" accept=".pdf,image/png,image/jpeg" maxSizeMB={5} onFileSelect={(file) => setForm(p => ({ ...p, attachment: file }))} /></div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editFeedback ? 'Update' : 'Submit'}</button></div></form>
    </div></div></div>
  );
};
export default ClientFeedbackFormModal;