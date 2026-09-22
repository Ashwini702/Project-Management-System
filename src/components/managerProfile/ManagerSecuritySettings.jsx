// src/components/managerProfile/ManagerSecuritySettings.jsx
import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { securitySettingsData, loginHistory, activeSessions } from '../../data/managerProfileData';

const ManagerSecuritySettings = ({ onChangePassword, onAlert }) => {
  const [settings, setSettings] = useState(securitySettingsData);

  return (
    <div>
      <div className="mp-info-card mb-3">
        <h6>Security Options</h6>
        <div className="mp-toggle-row">
          <span>Two-Factor Authentication</span>
          <label className="toggle-switch"><input type="checkbox" checked={settings.twoFactorEnabled} onChange={() => setSettings(p => ({ ...p, twoFactorEnabled: !p.twoFactorEnabled }))} /><span className="toggle-slider"></span></label>
        </div>
        <div className="mp-toggle-row">
          <span>Login Notification</span>
          <label className="toggle-switch"><input type="checkbox" checked={settings.loginNotification} onChange={() => setSettings(p => ({ ...p, loginNotification: !p.loginNotification }))} /><span className="toggle-slider"></span></label>
        </div>
        <div className="mt-3"><label className="form-label">Session Timeout</label><select className="form-select" value={settings.sessionTimeout} onChange={(e) => setSettings(p => ({ ...p, sessionTimeout: e.target.value }))}><option>15 Minutes</option><option>30 Minutes</option><option>1 Hour</option><option>2 Hours</option></select></div>
        <button className="btn btn-primary btn-sm mt-3" onClick={onChangePassword}>Change Password</button>
      </div>
      <div className="mp-info-card mb-3">
        <h6>Active Sessions</h6>
        {activeSessions.map(s => (
          <div key={s.id} className={`mp-session-item ${s.current ? 'current' : ''}`}>
            <div><strong>{s.device}</strong><span>{s.browser} • {s.location}</span><span className="mp-session-time">{s.lastActive}</span></div>
            {!s.current && <button className="btn btn-sm btn-outline-danger" onClick={() => onAlert('Logout is frontend demo.')}><FiLogOut /></button>}
          </div>
        ))}
      </div>
      <div className="mp-info-card">
        <h6>Recent Login History</h6>
        <div className="table-responsive">
          <table className="table mp-table">
            <thead><tr><th>Date/Time</th><th>IP Address</th><th>Device</th><th>Browser</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>{loginHistory.map(l => <tr key={l.id}><td>{l.dateTime}</td><td><code>{l.ipAddress}</code></td><td>{l.device}</td><td>{l.browser}</td><td>{l.location}</td><td><span className={`mp-badge ${l.status === 'Success' ? 'mp-badge-active' : 'mp-badge-inactive'}`}>{l.status}</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManagerSecuritySettings;