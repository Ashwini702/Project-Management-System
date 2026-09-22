// src/components/backup/AutoBackupSettings.jsx
import React, { useState } from 'react';
import { backupTypes, storageLocations } from '../../data/backupData';

const AutoBackupSettings = ({ settings: initialSettings, onSave }) => {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e) => { const { name, value, type, checked } = e.target; setSettings(p => ({ ...p, [name]: type === 'checkbox' ? checked : value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(settings); };

  return (
    <form onSubmit={handleSubmit} className="auto-backup-settings">
      <div className="settings-grid-2col">
        <div className="settings-card">
          <h6>Auto Backup Configuration</h6>
          <div className="toggle-row mb-3">
            <span>Enable Auto Backup</span>
            <label className="toggle-switch"><input type="checkbox" name="enabled" checked={settings.enabled} onChange={handleChange} /><span className="toggle-slider"></span></label>
          </div>
          <div className="mb-3"><label className="form-label">Backup Frequency</label><select className="form-select" name="frequency" value={settings.frequency} onChange={handleChange}><option>Daily</option><option>Weekly</option><option>Monthly</option></select></div>
          <div className="mb-3"><label className="form-label">Backup Time</label><input type="time" className="form-control" name="time" value={settings.time} onChange={handleChange} /></div>
          <div className="mb-3"><label className="form-label">Backup Type</label><select className="form-select" name="type" value={settings.type} onChange={handleChange}>{backupTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        </div>
        <div className="settings-card">
          <h6>Storage & Retention</h6>
          <div className="mb-3"><label className="form-label">Storage Location</label><select className="form-select" name="storageLocation" value={settings.storageLocation} onChange={handleChange}>{storageLocations.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
          <div className="mb-3"><label className="form-label">Retention Period</label><select className="form-select" name="retentionPeriod" value={settings.retentionPeriod} onChange={handleChange}><option>7 Days</option><option>15 Days</option><option>30 Days</option><option>90 Days</option></select></div>
          <div className="toggle-row">
            <span>Notify Admin on Completion</span>
            <label className="toggle-switch"><input type="checkbox" name="notifyAdmin" checked={settings.notifyAdmin} onChange={handleChange} /><span className="toggle-slider"></span></label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Save Settings</button>
    </form>
  );
};

export default AutoBackupSettings;