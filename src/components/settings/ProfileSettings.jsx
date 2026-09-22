// src/components/settings/ProfileSettings.jsx
import React, { useEffect, useState } from 'react';
import FileUploadField from '../common/FileUploadField';
import { profileSettingsData } from '../../data/settingsData';

const ProfileSettings = ({ profile = profileSettingsData, onSave }) => {
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
    if (!formData.phone.trim()) e.phone = 'Phone is required';
    if (!formData.company.trim()) e.company = 'Company is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { setFormData(p => ({ ...p, [e.target.name]: e.target.value })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSave('profile', formData); };

  return (
    <form onSubmit={handleSubmit}>
      <FileUploadField className="profile-upload mb-4" name="profilePhoto" title="Upload Photo" hint="JPG, PNG or GIF. Max 2MB" accept="image/jpeg,image/png,image/gif" maxSizeMB={2} onFileSelect={(file) => setFormData(p => ({ ...p, profilePhoto: file, profilePhotoName: file?.name || '' }))} />
      {formData.profilePhotoName && <p className="text-muted small mt-n3 mb-3">Selected file: {formData.profilePhotoName}</p>}
      <div className="row">
        <div className="col-md-6 mb-3"><label className="form-label">Full Name *</label><input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleChange} />{errors.name && <div className="invalid-feedback">{errors.name}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Email *</label><input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} />{errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Phone *</label><input type="tel" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} />{errors.phone && <div className="invalid-feedback">{errors.phone}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Designation</label><input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleChange} /></div>
        <div className="col-md-6 mb-3"><label className="form-label">Company *</label><input type="text" name="company" className={`form-control ${errors.company ? 'is-invalid' : ''}`} value={formData.company} onChange={handleChange} />{errors.company && <div className="invalid-feedback">{errors.company}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">City</label><input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} /></div>
        <div className="col-md-12 mb-3"><label className="form-label">Bio</label><textarea name="bio" className="form-control" rows="3" value={formData.bio} onChange={handleChange}></textarea></div>
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
  );
};
export default ProfileSettings;
