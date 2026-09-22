// src/components/managerNotifications/ManagerNotificationSettings.jsx
import React, { useState } from 'react';
import ManagerNotificationPreferenceBox from './ManagerNotificationPreferenceBox';

const ManagerNotificationSettings = ({ settings, onSave }) => {
  const [local, setLocal] = useState(settings);

  const toggle = (section, key) => {
    const updated = { ...local, [section]: { ...local[section], [key]: !local[section][key] } };
    setLocal(updated);
  };

  const ToggleRow = ({ label, checked, onChange }) => (
    <div className="mgn-toggle-row">
      <span>{label}</span>
      <label className="toggle-switch"><input type="checkbox" checked={checked} onChange={onChange} /><span className="toggle-slider"></span></label>
    </div>
  );

  return (
    <div className="mgn-settings">
      <div className="mgn-settings-grid">
        <ManagerNotificationPreferenceBox title="Task Notifications">
          <ToggleRow label="Task Assigned Alerts" checked={local.tasks.taskAssigned} onChange={() => toggle('tasks', 'taskAssigned')} />
          <ToggleRow label="Task Updated Alerts" checked={local.tasks.taskUpdated} onChange={() => toggle('tasks', 'taskUpdated')} />
          <ToggleRow label="Task Completed Alerts" checked={local.tasks.taskCompleted} onChange={() => toggle('tasks', 'taskCompleted')} />
          <ToggleRow label="Task Overdue Alerts" checked={local.tasks.taskOverdue} onChange={() => toggle('tasks', 'taskOverdue')} />
        </ManagerNotificationPreferenceBox>
        <ManagerNotificationPreferenceBox title="Project Notifications">
          <ToggleRow label="Status Update Alerts" checked={local.projects.projectStatus} onChange={() => toggle('projects', 'projectStatus')} />
          <ToggleRow label="Deadline Alerts" checked={local.projects.projectDeadline} onChange={() => toggle('projects', 'projectDeadline')} />
          <ToggleRow label="Document Upload Alerts" checked={local.projects.documentUpload} onChange={() => toggle('projects', 'documentUpload')} />
          <ToggleRow label="Milestone Alerts" checked={local.projects.projectMilestone} onChange={() => toggle('projects', 'projectMilestone')} />
        </ManagerNotificationPreferenceBox>
        <ManagerNotificationPreferenceBox title="Client Notifications">
          <ToggleRow label="Feedback Alerts" checked={local.clients.clientFeedback} onChange={() => toggle('clients', 'clientFeedback')} />
          <ToggleRow label="Approval Alerts" checked={local.clients.clientApproval} onChange={() => toggle('clients', 'clientApproval')} />
          <ToggleRow label="Message Alerts" checked={local.clients.clientMessage} onChange={() => toggle('clients', 'clientMessage')} />
        </ManagerNotificationPreferenceBox>
        <ManagerNotificationPreferenceBox title="Meeting Notifications">
          <ToggleRow label="Scheduled Alerts" checked={local.meetings.meetingScheduled} onChange={() => toggle('meetings', 'meetingScheduled')} />
          <ToggleRow label="Reminder Alerts" checked={local.meetings.meetingReminder} onChange={() => toggle('meetings', 'meetingReminder')} />
          <ToggleRow label="Cancelled Alerts" checked={local.meetings.meetingCancelled} onChange={() => toggle('meetings', 'meetingCancelled')} />
        </ManagerNotificationPreferenceBox>
        <ManagerNotificationPreferenceBox title="Delivery Channels">
          <ToggleRow label="System Notifications" checked={local.channels.system} onChange={() => toggle('channels', 'system')} />
          <ToggleRow label="Email Notifications" checked={local.channels.email} onChange={() => toggle('channels', 'email')} />
          <ToggleRow label="WhatsApp Notifications" checked={local.channels.whatsapp} onChange={() => toggle('channels', 'whatsapp')} />
        </ManagerNotificationPreferenceBox>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave(local)}>Save Preferences</button>
    </div>
  );
};
export default ManagerNotificationSettings;