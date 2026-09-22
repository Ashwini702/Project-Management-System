// src/components/clientProfile/ClientNotificationPreferences.jsx
import React, { useState } from 'react';
import { notificationPreferences } from '../../data/clientProfileData';

const ClientNotificationPreferences = ({ onSave }) => {
  const [prefs, setPrefs] = useState(notificationPreferences);
  const toggle = (section, key) => setPrefs(p => ({ ...p, [section]: { ...p[section], [key]: !p[section][key] } }));

  const ToggleRow = ({ label, checked, onChange }) => (
    <div className="cprof-toggle-row"><span>{label}</span><label className="toggle-switch"><input type="checkbox" checked={checked} onChange={onChange} /><span className="toggle-slider"></span></label></div>
  );

  return (
    <div>
      <div className="cprof-settings-grid">
        <div className="cprof-info-card"><h6>Projects</h6><ToggleRow label="Status Updates" checked={prefs.projects.projectStatus} onChange={() => toggle('projects', 'projectStatus')} /><ToggleRow label="Deadline Reminders" checked={prefs.projects.deadlineReminder} onChange={() => toggle('projects', 'deadlineReminder')} /><ToggleRow label="File Uploads" checked={prefs.projects.fileUpload} onChange={() => toggle('projects', 'fileUpload')} /><ToggleRow label="Milestones" checked={prefs.projects.milestoneUpdate} onChange={() => toggle('projects', 'milestoneUpdate')} /></div>
        <div className="cprof-info-card"><h6>Feedback</h6><ToggleRow label="Response Alerts" checked={prefs.feedback.feedbackResponse} onChange={() => toggle('feedback', 'feedbackResponse')} /><ToggleRow label="Approval Updates" checked={prefs.feedback.approvalStatus} onChange={() => toggle('feedback', 'approvalStatus')} /><ToggleRow label="Change Requests" checked={prefs.feedback.changeRequest} onChange={() => toggle('feedback', 'changeRequest')} /></div>
        <div className="cprof-info-card"><h6>Invoices</h6><ToggleRow label="Generated Alerts" checked={prefs.invoices.invoiceGenerated} onChange={() => toggle('invoices', 'invoiceGenerated')} /><ToggleRow label="Payment Reminders" checked={prefs.invoices.paymentReminder} onChange={() => toggle('invoices', 'paymentReminder')} /><ToggleRow label="Confirmations" checked={prefs.invoices.paymentConfirmation} onChange={() => toggle('invoices', 'paymentConfirmation')} /></div>
        <div className="cprof-info-card"><h6>Messages</h6><ToggleRow label="New Messages" checked={prefs.messages.newMessage} onChange={() => toggle('messages', 'newMessage')} /><ToggleRow label="Support Replies" checked={prefs.messages.supportReply} onChange={() => toggle('messages', 'supportReply')} /><ToggleRow label="Manager Replies" checked={prefs.messages.managerReply} onChange={() => toggle('messages', 'managerReply')} /></div>
        <div className="cprof-info-card"><h6>Channels</h6><ToggleRow label="System" checked={prefs.channels.system} onChange={() => toggle('channels', 'system')} /><ToggleRow label="Email" checked={prefs.channels.email} onChange={() => toggle('channels', 'email')} /><ToggleRow label="WhatsApp" checked={prefs.channels.whatsapp} onChange={() => toggle('channels', 'whatsapp')} /></div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave(prefs)}>Save Preferences</button>
    </div>
  );
};
export default ClientNotificationPreferences;