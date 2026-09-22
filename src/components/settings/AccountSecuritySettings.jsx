// src/components/settings/AccountSecuritySettings.jsx
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi';
import SettingsToggle from './SettingsToggle';
import { securitySettingsData } from '../../data/settingsData';

const AccountSecuritySettings = ({ onSave, onDeviceLogout, initialSettings }) => {
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, newPass: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [settings, setSettings] = useState(initialSettings || securitySettingsData);
  useEffect(() => { if (initialSettings) setSettings(initialSettings); }, [initialSettings]);

  const toggleShow = (field) => setShowPass(p => ({ ...p, [field]: !p[field] }));

  const validatePassword = () => {
    const e = {};
    if (!passwordForm.current) e.current = 'Current password required';
    if (!passwordForm.newPass) e.newPass = 'New password required';
    else if (passwordForm.newPass.length < 6) e.newPass = 'Min 6 characters';
    if (!passwordForm.confirm) e.confirm = 'Confirm password required';
    else if (passwordForm.newPass !== passwordForm.confirm) e.confirm = 'Passwords do not match';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handlePasswordChange = (e) => { setPasswordForm(p => ({ ...p, [e.target.name]: e.target.value })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validatePassword()) { onSave('security', { passwordForm, settings }); setPasswordForm({ current: '', newPass: '', confirm: '' }); } };

  return (
    <div>
      <h6 className="mb-3">Change Password</h6>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {['current', 'newPass', 'confirm'].map((field, i) => (
            <div className="col-md-4 mb-3" key={field}>
              <label className="form-label">{field === 'current' ? 'Current Password *' : field === 'newPass' ? 'New Password *' : 'Confirm Password *'}</label>
              <div className="input-wrapper">
                <input type={showPass[field] ? 'text' : 'password'} name={field} className={`form-control ${errors[field] ? 'is-invalid' : ''}`} value={passwordForm[field]} onChange={handlePasswordChange} />
                <button type="button" className="password-toggle" onClick={() => toggleShow(field)}>{showPass[field] ? <FiEyeOff /> : <FiEye />}</button>
              </div>
              {errors[field] && <div className="invalid-feedback d-block">{errors[field]}</div>}
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary mb-4">Update Password</button>
      </form>

      <h6 className="mb-3">Security Options</h6>
      <SettingsToggle label="Two-Factor Authentication" description="Add extra layer of security" checked={settings.twoFactorEnabled} onChange={() => setSettings(p => ({ ...p, twoFactorEnabled: !p.twoFactorEnabled }))} />
      <SettingsToggle label="Login Notification" description="Get notified on new logins" checked={settings.loginNotification} onChange={() => setSettings(p => ({ ...p, loginNotification: !p.loginNotification }))} />
      <div className="mb-4"><label className="form-label">Session Timeout</label><select className="form-select" value={settings.sessionTimeout} onChange={(e) => setSettings(p => ({ ...p, sessionTimeout: e.target.value }))}><option>15 Minutes</option><option>30 Minutes</option><option>1 Hour</option><option>2 Hours</option><option>Never</option></select></div>

      <h6 className="mb-3">Recent Login Devices</h6>
      <div className="devices-list">
        {settings.recentDevices.map(d => (
          <div key={d.id} className={`device-item ${d.current ? 'current' : ''}`}>
            <div className="device-info"><strong>{d.device}</strong><span>{d.browser} • {d.location}</span><span className="device-time">{d.lastActive}{d.current ? ' (Current)' : ''}</span></div>
            {!d.current && <button className="btn btn-sm btn-outline-danger" onClick={() => onDeviceLogout(d.id)}><FiLogOut /></button>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AccountSecuritySettings;
