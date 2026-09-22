// src/components/clientProfile/ClientProfileEditModal.jsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import FileUploadField from '../common/FileUploadField';

const ClientProfileEditModal = ({ show, onClose, profile, company, onSubmit }) => {
  const [form, setForm] = useState({ ...profile, ...company });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim()) e.email = 'Email required';
    if (!form.phone.trim()) e.phone = 'Phone required';
    if (!form.companyName.trim()) e.companyName = 'Company required';
    if (!form.companyEmail.trim()) e.companyEmail = 'Company email required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(form); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Edit Profile</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <FileUploadField className="text-center mb-3 profile-photo-upload" name="profilePhoto" title="Upload Photo" hint="JPG, PNG or GIF. Max 2MB" accept="image/jpeg,image/png,image/gif" maxSizeMB={2} onFileSelect={(file) => setForm(p => ({ ...p, profilePhoto: file }))} />
        <div className="row">
          <div className="col-md-6 mb-3"><label className="form-label">Full Name *</label><input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={handleChange} />{errors.name && <div className="invalid-feedback">{errors.name}</div>}</div>
          <div className="col-md-6 mb-3"><label className="form-label">Email *</label><input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={handleChange} />{errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
          <div className="col-md-6 mb-3"><label className="form-label">Phone *</label><input type="tel" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={form.phone} onChange={handleChange} />{errors.phone && <div className="invalid-feedback">{errors.phone}</div>}</div>
          <div className="col-md-6 mb-3"><label className="form-label">Alternate Phone</label><input type="tel" name="alternatePhone" className="form-control" value={form.alternatePhone} onChange={handleChange} /></div>
          <div className="col-md-4 mb-3"><label className="form-label">City</label><input type="text" name="city" className="form-control" value={form.city} onChange={handleChange} /></div>
          <div className="col-md-4 mb-3"><label className="form-label">State</label><input type="text" name="state" className="form-control" value={form.state} onChange={handleChange} /></div>
          <div className="col-md-4 mb-3"><label className="form-label">Country</label><input type="text" name="country" className="form-control" value={form.country} onChange={handleChange} /></div>
          <div className="col-md-12 mb-3"><label className="form-label">Address</label><textarea name="address" className="form-control" rows="2" value={form.address} onChange={handleChange}></textarea></div>
          <div className="col-md-6 mb-3"><label className="form-label">Company Name *</label><input type="text" name="companyName" className={`form-control ${errors.companyName ? 'is-invalid' : ''}`} value={form.companyName} onChange={handleChange} />{errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}</div>
          <div className="col-md-6 mb-3"><label className="form-label">Company Email *</label><input type="email" name="companyEmail" className={`form-control ${errors.companyEmail ? 'is-invalid' : ''}`} value={form.companyEmail} onChange={handleChange} />{errors.companyEmail && <div className="invalid-feedback">{errors.companyEmail}</div>}</div>
          <div className="col-md-6 mb-3"><label className="form-label">Website</label><input type="text" name="website" className="form-control" value={form.website} onChange={handleChange} /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Industry</label><input type="text" name="industry" className="form-control" value={form.industry} onChange={handleChange} /></div>
          <div className="col-md-12 mb-3"><label className="form-label">Bio</label><textarea name="bio" className="form-control" rows="3" value={form.bio} onChange={handleChange}></textarea></div>
        </div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Save Profile</button></div></form>
    </div></div></div>
  );
};
export default ClientProfileEditModal;
