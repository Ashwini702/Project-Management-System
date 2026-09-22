// src/components/notifications/NotificationSettings.jsx
import React, { useState } from 'react';

const NotificationSettings = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const toggle = (section, key) => {
    const updated = { ...localSettings, [section]: { ...localSettings[section], [key]: !localSettings[section][key] } };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="toggle-row">
      <span className="toggle-label">{label}</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );

  return (
    <div className="notification-settings">
      <div className="settings-grid">
        <div className="settings-card">
          <h6>System Notifications</h6>
          <ToggleSwitch checked={localSettings.system.projectUpdates} onChange={() => toggle('system', 'projectUpdates')} label="Project Updates" />
          <ToggleSwitch checked={localSettings.system.taskUpdates} onChange={() => toggle('system', 'taskUpdates')} label="Task Updates" />
          <ToggleSwitch checked={localSettings.system.deadlineReminders} onChange={() => toggle('system', 'deadlineReminders')} label="Deadline Reminders" />
          <ToggleSwitch checked={localSettings.system.announcements} onChange={() => toggle('system', 'announcements')} label="Announcements" />
        </div>
        <div className="settings-card">
          <h6>Email Notifications</h6>
          <ToggleSwitch checked={localSettings.email.enableAlerts} onChange={() => toggle('email', 'enableAlerts')} label="Enable Email Alerts" />
          <ToggleSwitch checked={localSettings.email.dailySummary} onChange={() => toggle('email', 'dailySummary')} label="Daily Summary Email" />
          <ToggleSwitch checked={localSettings.email.taskAssigned} onChange={() => toggle('email', 'taskAssigned')} label="Task Assigned Email" />
          <ToggleSwitch checked={localSettings.email.deadlineReminder} onChange={() => toggle('email', 'deadlineReminder')} label="Deadline Reminder Email" />
        </div>
        <div className="settings-card">
          <h6>WhatsApp Notifications</h6>
          <ToggleSwitch checked={localSettings.whatsapp.enableAlerts} onChange={() => toggle('whatsapp', 'enableAlerts')} label="Enable WhatsApp Alerts" />
          <ToggleSwitch checked={localSettings.whatsapp.deadlineReminders} onChange={() => toggle('whatsapp', 'deadlineReminders')} label="Deadline Reminders" />
          <ToggleSwitch checked={localSettings.whatsapp.projectUpdates} onChange={() => toggle('whatsapp', 'projectUpdates')} label="Project Updates" />
          <ToggleSwitch checked={localSettings.whatsapp.paymentReminders} onChange={() => toggle('whatsapp', 'paymentReminders')} label="Payment Reminders" />
        </div>
        <div className="settings-card">
          <h6>Reminder Settings</h6>
          <div className="form-group mb-3">
            <label className="form-label">Remind Before Deadline</label>
            <select className="form-select" value={localSettings.reminders.beforeDeadline} onChange={(e) => setLocalSettings({ ...localSettings, reminders: { ...localSettings.reminders, beforeDeadline: e.target.value } })}>
              <option>10 Minutes</option><option>30 Minutes</option><option>1 Hour</option><option>1 Day</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Repeat Overdue Reminders</label>
            <select className="form-select" value={localSettings.reminders.repeatOverdue} onChange={(e) => setLocalSettings({ ...localSettings, reminders: { ...localSettings.reminders, repeatOverdue: e.target.value } })}>
              <option>Daily</option><option>Every 2 Days</option><option>Weekly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;