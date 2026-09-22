// src/components/teamProfile/TeamSecuritySettings.jsx
import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { securitySettingsData, loginHistory, activeSessions } from '../../data/teamProfileData';
import TeamStatusBadge from './TeamStatusBadge';

const TeamSecuritySettings = ({ onChangePassword, onAlert }) => {
  const [settings, setSettings] = useState(securitySettingsData);

  return (
    <div>
      <div className="tprof-info-card mb-3">
        <h6>Security Options</h6>
        <div className="tprof-toggle-row">
          <span>Two-Factor Authentication</span>
          <label className="toggle-switch"><input type="checkbox" checked={settings.twoFactorEnabled} onChange={() => setSettings(p => ({ ...p, twoFactorEnabled: !p.twoFactorEnabled }))} /><span className="toggle-slider"></span></label>
        </div>
        <div className="tprof-toggle-row">
          <span>Login Notification</span>
          <label className="toggle-switch"><input type="checkbox" checked={settings.loginNotification} onChange={() => setSettings(p => ({ ...p, loginNotification: !p.loginNotification }))} /><span className="toggle-slider"></span></label>
        </div>
        <button className="btn btn-primary btn-sm mt-3" onClick={onChangePassword}>Change Password</button>
      </div>
      <div className="tprof-info-card mb-3">
        <h6>Active Sessions</h6>
        {activeSessions.map(s => (
          <div key={s.id} className={`tprof-session-item ${s.current ? 'current' : ''}`}>
            <div><strong>{s.device}</strong><span>{s.browser} • {s.location}</span><span className="tprof-session-time">{s.lastActive}</span></div>
            {!s.current && <button className="btn btn-sm btn-outline-danger" onClick={() => onAlert('Logout is demo.')}><FiLogOut /></button>}
          </div>
        ))}
      </div>
      <div className="tprof-info-card">
        <h6>Login History</h6>
        <div className="table-responsive"><table className="table tprof-table"><thead><tr><th>Date/Time</th><th>IP</th><th>Device</th><th>Browser</th><th>Location</th><th>Status</th></tr></thead><tbody>{loginHistory.map(l => <tr key={l.id}><td>{l.dateTime}</td><td><code>{l.ipAddress}</code></td><td>{l.device}</td><td>{l.browser}</td><td>{l.location}</td><td><TeamStatusBadge status={l.status === 'Success' ? 'Active' : 'Inactive'} /></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
};
export default TeamSecuritySettings;