// src/components/settings/NotificationPreferenceSettings.jsx
import React, { useEffect, useState } from 'react';
import SettingsToggle from './SettingsToggle';
import { notificationPreferencesData } from '../../data/settingsData';

const NotificationPreferenceSettings = ({ onSave, initialSettings }) => {
  const [prefs, setPrefs] = useState(initialSettings || notificationPreferencesData);
  useEffect(() => { if (initialSettings) setPrefs(initialSettings); }, [initialSettings]);

  const toggleSystem = (key) => setPrefs(p => ({ ...p, system: { ...p.system, [key]: !p.system[key] } }));
  const toggleEmail = (key) => setPrefs(p => ({ ...p, email: { ...p.email, [key]: !p.email[key] } }));
  const toggleWA = (key) => setPrefs(p => ({ ...p, whatsapp: { ...p.whatsapp, [key]: !p.whatsapp[key] } }));

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h6>System Notifications</h6>
          <SettingsToggle label="Project Assigned" checked={prefs.system.projectAssigned} onChange={() => toggleSystem('projectAssigned')} />
          <SettingsToggle label="Task Assigned" checked={prefs.system.taskAssigned} onChange={() => toggleSystem('taskAssigned')} />
          <SettingsToggle label="Deadline Reminder" checked={prefs.system.deadlineReminder} onChange={() => toggleSystem('deadlineReminder')} />
          <SettingsToggle label="Project Status Update" checked={prefs.system.projectStatusUpdate} onChange={() => toggleSystem('projectStatusUpdate')} />
          <SettingsToggle label="Admin Announcement" checked={prefs.system.adminAnnouncement} onChange={() => toggleSystem('adminAnnouncement')} />
        </div>
        <div className="col-md-6 mb-4">
          <h6>Email Notifications</h6>
          <SettingsToggle label="Enable Email Alerts" checked={prefs.email.enableAlerts} onChange={() => toggleEmail('enableAlerts')} />
          <SettingsToggle label="Daily Summary" checked={prefs.email.dailySummary} onChange={() => toggleEmail('dailySummary')} />
          <SettingsToggle label="Weekly Report" checked={prefs.email.weeklyReport} onChange={() => toggleEmail('weeklyReport')} />
          <SettingsToggle label="Deadline Reminder" checked={prefs.email.deadlineReminder} onChange={() => toggleEmail('deadlineReminder')} />
          <SettingsToggle label="Client Feedback" checked={prefs.email.clientFeedback} onChange={() => toggleEmail('clientFeedback')} />
        </div>
        <div className="col-md-6 mb-4">
          <h6>WhatsApp Notifications</h6>
          <SettingsToggle label="Enable WhatsApp Alerts" checked={prefs.whatsapp.enableAlerts} onChange={() => toggleWA('enableAlerts')} />
          <SettingsToggle label="Task Update Alert" checked={prefs.whatsapp.taskUpdate} onChange={() => toggleWA('taskUpdate')} />
          <SettingsToggle label="Payment Reminder" checked={prefs.whatsapp.paymentReminder} onChange={() => toggleWA('paymentReminder')} />
          <SettingsToggle label="Meeting Reminder" checked={prefs.whatsapp.meetingReminder} onChange={() => toggleWA('meetingReminder')} />
          <SettingsToggle label="Project Deadline" checked={prefs.whatsapp.projectDeadline} onChange={() => toggleWA('projectDeadline')} />
        </div>
        <div className="col-md-6 mb-4">
          <h6>Reminder Timing</h6>
          <div className="mb-3"><label className="form-label">Before Deadline</label><select className="form-select" value={prefs.reminders.beforeDeadline} onChange={(e) => setPrefs(p => ({ ...p, reminders: { ...p.reminders, beforeDeadline: e.target.value } }))}><option>10 Minutes</option><option>30 Minutes</option><option>1 Hour</option><option>1 Day</option></select></div>
          <div className="mb-3"><label className="form-label">Overdue Frequency</label><select className="form-select" value={prefs.reminders.overdueFrequency} onChange={(e) => setPrefs(p => ({ ...p, reminders: { ...p.reminders, overdueFrequency: e.target.value } }))}><option>Daily</option><option>Every 2 Days</option><option>Weekly</option></select></div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => onSave('notifications', prefs)}>Save Preferences</button>
    </div>
  );
};
export default NotificationPreferenceSettings;
