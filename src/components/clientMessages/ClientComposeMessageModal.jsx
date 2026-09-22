// src/components/clientMessages/ClientComposeMessageModal.jsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { projects, messageTypes, senders } from '../../data/clientMessagesData';
import FileUploadField from '../common/FileUploadField';

const ClientComposeMessageModal = ({ show, onClose, onSubmit }) => {
  const initial = { projectName: '', sendTo: '', type: 'General Message', subject: '', message: '', priority: 'Medium', attachment: null };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.projectName) e.projectName = 'Project is required';
    if (!form.sendTo) e.sendTo = 'Recipient is required';
    if (!form.type) e.type = 'Type is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    if (!form.priority) e.priority = 'Priority is required';
    setErrors(e); return Object.keys(e).length === 0;
  };
  const handleChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) { onSubmit(form); setForm(initial); } };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Compose Message</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="projectName" className={`form-select ${errors.projectName ? 'is-invalid' : ''}`} value={form.projectName} onChange={handleChange}><option value="">Select</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Send To *</label><select name="sendTo" className={`form-select ${errors.sendTo ? 'is-invalid' : ''}`} value={form.sendTo} onChange={handleChange}><option value="">Select</option>{senders.map(s => <option key={s} value={s}>{s}</option>)}</select>{errors.sendTo && <div className="invalid-feedback">{errors.sendTo}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Type *</label><select name="type" className={`form-select ${errors.type ? 'is-invalid' : ''}`} value={form.type} onChange={handleChange}>{messageTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.type && <div className="invalid-feedback">{errors.type}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Priority *</label><select name="priority" className={`form-select ${errors.priority ? 'is-invalid' : ''}`} value={form.priority} onChange={handleChange}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>{errors.priority && <div className="invalid-feedback">{errors.priority}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Subject *</label><input type="text" name="subject" className={`form-control ${errors.subject ? 'is-invalid' : ''}`} value={form.subject} onChange={handleChange} />{errors.subject && <div className="invalid-feedback">{errors.subject}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Message *</label><textarea name="message" className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="4" value={form.message} onChange={handleChange}></textarea>{errors.message && <div className="invalid-feedback">{errors.message}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Attachments</label><FileUploadField className="cmsg-upload-field" name="attachment" title="Upload Attachment" hint="Supports PDF, PNG, JPG (Max 5MB)" accept=".pdf,image/png,image/jpeg" maxSizeMB={5} onFileSelect={(file) => setForm(p => ({ ...p, attachment: file }))} /></div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Send Message</button></div></form>
    </div></div></div>
  );
};
export default ClientComposeMessageModal;
