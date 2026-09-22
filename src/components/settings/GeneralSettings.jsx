// src/components/settings/GeneralSettings.jsx
import React, { useEffect, useState } from 'react';
import { generalSettingsData } from '../../data/settingsData';

const GeneralSettings = ({ onSave, initialSettings }) => {
  const [formData, setFormData] = useState(initialSettings || generalSettingsData);
  useEffect(() => { if (initialSettings) setFormData(initialSettings); }, [initialSettings]);
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave('general', formData); }}>
      <div className="row">
        <div className="col-md-6 mb-3"><label className="form-label">App Name</label><input type="text" name="appName" className="form-control" value={formData.appName} onChange={handleChange} /></div>
        <div className="col-md-6 mb-3"><label className="form-label">Company Name</label><input type="text" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} /></div>
        <div className="col-md-6 mb-3"><label className="form-label">Company Email</label><input type="email" name="companyEmail" className="form-control" value={formData.companyEmail} onChange={handleChange} /></div>
        <div className="col-md-6 mb-3"><label className="form-label">Company Phone</label><input type="text" name="companyPhone" className="form-control" value={formData.companyPhone} onChange={handleChange} /></div>
        <div className="col-md-12 mb-3"><label className="form-label">Address</label><textarea name="companyAddress" className="form-control" rows="2" value={formData.companyAddress} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Currency</label><select name="currency" className="form-select" value={formData.currency} onChange={handleChange}><option>INR</option><option>USD</option><option>EUR</option></select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Date Format</label><select name="dateFormat" className="form-select" value={formData.dateFormat} onChange={handleChange}><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
        <div className="col-md-4 mb-3"><label className="form-label">Time Format</label><select name="timeFormat" className="form-select" value={formData.timeFormat} onChange={handleChange}><option>12 Hour</option><option>24 Hour</option></select></div>
        <div className="col-md-4 mb-3"><label className="form-label">Timezone</label><select name="timezone" className="form-select" value={formData.timezone} onChange={handleChange}><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option><option>Europe/London</option></select></div>
        <div className="col-md-4 mb-3"><label className="form-label">Language</label><select name="language" className="form-select" value={formData.language} onChange={handleChange}><option>English</option><option>Hindi</option><option>Marathi</option></select></div>
      </div>
      <button type="submit" className="btn btn-primary">Save General Settings</button>
    </form>
  );
};
export default GeneralSettings;
