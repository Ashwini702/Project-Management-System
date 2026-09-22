// src/components/clients/ClientFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { industries, projectsForClients } from '../../data/clientData';
import FileUploadField from '../common/FileUploadField';

const ClientFormModal = ({ show, onClose, onSubmit, editClient }) => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', city: '', industry: '',
    assignedProjects: [], status: 'Active', paymentStatus: 'Pending',
    projectValue: 0, paidAmount: 0, notes: '', companyLogo: null, password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editClient) {
      setFormData({
        name: editClient.name || '', company: editClient.company || '', email: editClient.email || '',
        phone: editClient.phone || '', city: editClient.city || '', industry: editClient.industry || '',
        assignedProjects: editClient.assignedProjects || [], status: editClient.status || 'Active',
        paymentStatus: editClient.paymentStatus || 'Pending', projectValue: editClient.projectValue || 0,
        paidAmount: editClient.paidAmount || 0, notes: editClient.notes || '', companyLogo: editClient.companyLogo || null, password: '', confirmPassword: ''
      });
    } else {
      setFormData({ name: '', company: '', email: '', phone: '', city: '', industry: '', assignedProjects: [], status: 'Active', paymentStatus: 'Pending', projectValue: 0, paidAmount: 0, notes: '', companyLogo: null, password: '', confirmPassword: '' });
    }
    setErrors({});
  }, [editClient, show]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Client name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!editClient && !formData.password) newErrors.password = 'Login password is required';
    else if (formData.password && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.paymentStatus) newErrors.paymentStatus = 'Payment status is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const toggleProject = (project) => {
    setFormData(prev => ({
      ...prev,
      assignedProjects: prev.assignedProjects.includes(project)
        ? prev.assignedProjects.filter(p => p !== project)
        : [...prev.assignedProjects, project]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay dashboard-form-overlay">
      <div className="modal-dialog modal-lg dashboard-form-dialog">
        <div className="modal-content dashboard-form-modal">
          <div className="modal-header dashboard-form-header"><h5 className="modal-title">{editClient ? 'Edit Client' : 'Add Client'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-body dashboard-form-body">
              <FileUploadField className="image-upload-section mb-3" name="companyLogo" title="Upload Company Logo" hint="JPG, PNG. Max 2MB" accept="image/jpeg,image/png" maxSizeMB={2} onFileSelect={(file) => setFormData(prev => ({ ...prev, companyLogo: file }))} />
              <div className="row dashboard-form-grid">
                <div className="col-md-6 mb-3"><label className="form-label">Client Name *</label><input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleChange} placeholder="Enter client name" />{errors.name && <div className="invalid-feedback">{errors.name}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">Company Name *</label><input type="text" name="company" className={`form-control ${errors.company ? 'is-invalid' : ''}`} value={formData.company} onChange={handleChange} placeholder="Enter company name" />{errors.company && <div className="invalid-feedback">{errors.company}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">Email *</label><input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} placeholder="Enter email" />{errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">Phone *</label><input type="tel" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} placeholder="Enter phone" />{errors.phone && <div className="invalid-feedback">{errors.phone}</div>}</div><div className="col-md-6 mb-3"><label className="form-label">Login Password {!editClient && '*'}</label><input type="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={formData.password} onChange={handleChange} placeholder={editClient ? 'Leave blank to keep current password' : 'Create client login password'} autoComplete="new-password" />{errors.password && <div className="invalid-feedback">{errors.password}</div>}</div><div className="col-md-6 mb-3"><label className="form-label">Confirm Password {!editClient && '*'}</label><input type="password" name="confirmPassword" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm login password" autoComplete="new-password" />{errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">City</label><input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} placeholder="Enter city" /></div>
                <div className="col-md-6 mb-3"><label className="form-label">Industry *</label><select name="industry" className={`form-select ${errors.industry ? 'is-invalid' : ''}`} value={formData.industry} onChange={handleChange}><option value="">Select Industry</option>{industries.map(i => <option key={i} value={i}>{i}</option>)}</select>{errors.industry && <div className="invalid-feedback">{errors.industry}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">Client Status *</label><select name="status" className={`form-select ${errors.status ? 'is-invalid' : ''}`} value={formData.status} onChange={handleChange}><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option><option value="Completed">Completed</option></select>{errors.status && <div className="invalid-feedback">{errors.status}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">Payment Status *</label><select name="paymentStatus" className={`form-select ${errors.paymentStatus ? 'is-invalid' : ''}`} value={formData.paymentStatus} onChange={handleChange}><option value="Paid">Paid</option><option value="Pending">Pending</option><option value="Partial">Partial</option><option value="Overdue">Overdue</option></select>{errors.paymentStatus && <div className="invalid-feedback">{errors.paymentStatus}</div>}</div>
                <div className="col-md-6 mb-3"><label className="form-label">Project Value (₹)</label><input type="number" name="projectValue" className="form-control" value={formData.projectValue} onChange={handleChange} /></div>
                <div className="col-md-6 mb-3"><label className="form-label">Paid Amount (₹)</label><input type="number" name="paidAmount" className="form-control" value={formData.paidAmount} onChange={handleChange} /></div>
                <div className="col-md-12 mb-3"><label className="form-label">Assigned Projects</label><div className="projects-select-grid">{projectsForClients.map(p => <div key={p} className={`project-chip ${formData.assignedProjects.includes(p) ? 'selected' : ''}`} onClick={() => toggleProject(p)}>{p}</div>)}</div></div>
                <div className="col-md-12 mb-3"><label className="form-label">Notes</label><textarea name="notes" className="form-control" rows="2" value={formData.notes} onChange={handleChange} placeholder="Client notes..."></textarea></div>
              </div>
            </div>
            <div className="modal-footer dashboard-form-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editClient ? 'Update Client' : 'Save Client'}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientFormModal;
