// src/components/settings/SystemPreferenceSettings.jsx
import React, { useEffect, useState } from 'react';
import SettingsToggle from './SettingsToggle';
import { systemPreferencesData } from '../../data/settingsData';

const SystemPreferenceSettings = ({ onSave, initialSettings }) => {
  const [settings, setSettings] = useState(initialSettings || systemPreferencesData);
  useEffect(() => { if (initialSettings) setSettings(initialSettings); }, [initialSettings]);

  const toggle = (key) => setSettings(p => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h6>System Options</h6>
          <SettingsToggle label="Auto Logout" checked={settings.autoLogout} onChange={() => toggle('autoLogout')} />
          <SettingsToggle label="Auto Backup" checked={settings.autoBackup} onChange={() => toggle('autoBackup')} />
          <SettingsToggle label="Activity Logging" checked={settings.activityLogging} onChange={() => toggle('activityLogging')} />
          <SettingsToggle label="Maintenance Mode" checked={settings.maintenanceMode} onChange={() => toggle('maintenanceMode')} />
          <SettingsToggle label="Allow Client Login" checked={settings.allowClientLogin} onChange={() => toggle('allowClientLogin')} />
          <SettingsToggle label="Allow File Upload" checked={settings.allowFileUpload} onChange={() => toggle('allowFileUpload')} />
        </div>
        <div className="col-md-6">
          <h6>Feature Toggles</h6>
          <SettingsToggle label="Enable Report Export" checked={settings.enableReportExport} onChange={() => toggle('enableReportExport')} />
          <SettingsToggle label="Enable Invoice Generation" checked={settings.enableInvoiceGen} onChange={() => toggle('enableInvoiceGen')} />
          <SettingsToggle label="Enable Payment Reminders" checked={settings.enablePaymentReminder} onChange={() => toggle('enablePaymentReminder')} />
          <SettingsToggle label="Enable AI Suggestions" checked={settings.enableAISuggestions} onChange={() => toggle('enableAISuggestions')} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3 mb-3"><label className="form-label">Default Project Status</label><select className="form-select" value={settings.defaultProjectStatus} onChange={(e) => setSettings(p => ({ ...p, defaultProjectStatus: e.target.value }))}><option>Not Started</option><option>In Progress</option><option>On Hold</option></select></div>
        <div className="col-md-3 mb-3"><label className="form-label">Default Task Status</label><select className="form-select" value={settings.defaultTaskStatus} onChange={(e) => setSettings(p => ({ ...p, defaultTaskStatus: e.target.value }))}><option>Pending</option><option>In Progress</option><option>Under Review</option></select></div>
        <div className="col-md-3 mb-3"><label className="form-label">Default Priority</label><select className="form-select" value={settings.defaultTaskPriority} onChange={(e) => setSettings(p => ({ ...p, defaultTaskPriority: e.target.value }))}><option>Low</option><option>Medium</option><option>High</option></select></div>
        <div className="col-md-3 mb-3"><label className="form-label">Default Project View</label><select className="form-select" value={settings.defaultProjectView} onChange={(e) => setSettings(p => ({ ...p, defaultProjectView: e.target.value }))}><option>Card View</option><option>Table View</option><option>Kanban View</option></select></div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave('system', settings)}>Save Preferences</button>
    </div>
  );
};
export default SystemPreferenceSettings;
