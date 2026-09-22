// src/components/teamNotifications/TeamNotificationSettings.jsx
import React, { useState } from 'react';
import TeamNotificationPreferenceBox from './TeamNotificationPreferenceBox';
import { notificationSettingsData } from '../../data/teamNotificationsData';

const TeamNotificationSettings = ({ onSave }) => {
  const [settings, setSettings] = useState(notificationSettingsData);
  const toggle = (section, key) => setSettings(p => ({ ...p, [section]: { ...p[section], [key]: !p[section][key] } }));

  const ToggleRow = ({ label, checked, onChange }) => (
    <div className="tn-toggle-row"><span>{label}</span><label className="toggle-switch"><input type="checkbox" checked={checked} onChange={onChange} /><span className="toggle-slider"></span></label></div>
  );

  return (
    <div>
      <div className="tn-settings-grid">
        <TeamNotificationPreferenceBox title="Task Notifications">
          <ToggleRow label="New Task Assigned" checked={settings.tasks.taskAssigned} onChange={() => toggle('tasks', 'taskAssigned')} />
          <ToggleRow label="Task Status Updated" checked={settings.tasks.taskUpdated} onChange={() => toggle('tasks', 'taskUpdated')} />
          <ToggleRow label="Task Comment Added" checked={settings.tasks.taskComment} onChange={() => toggle('tasks', 'taskComment')} />
          <ToggleRow label="Deadline Reminder" checked={settings.tasks.taskDeadline} onChange={() => toggle('tasks', 'taskDeadline')} />
          <ToggleRow label="Review Update" checked={settings.tasks.taskReview} onChange={() => toggle('tasks', 'taskReview')} />
        </TeamNotificationPreferenceBox>
        <TeamNotificationPreferenceBox title="Project Notifications">
          <ToggleRow label="Project Updates" checked={settings.projects.projectUpdate} onChange={() => toggle('projects', 'projectUpdate')} />
          <ToggleRow label="File Uploads" checked={settings.projects.fileUpload} onChange={() => toggle('projects', 'fileUpload')} />
          <ToggleRow label="Milestones" checked={settings.projects.milestone} onChange={() => toggle('projects', 'milestone')} />
          <ToggleRow label="Status Changes" checked={settings.projects.statusChange} onChange={() => toggle('projects', 'statusChange')} />
        </TeamNotificationPreferenceBox>
        <TeamNotificationPreferenceBox title="Deadlines">
          <ToggleRow label="Today Deadline" checked={settings.deadlines.todayDeadline} onChange={() => toggle('deadlines', 'todayDeadline')} />
          <ToggleRow label="Upcoming Deadline" checked={settings.deadlines.upcomingDeadline} onChange={() => toggle('deadlines', 'upcomingDeadline')} />
          <ToggleRow label="Overdue Deadline" checked={settings.deadlines.overdueDeadline} onChange={() => toggle('deadlines', 'overdueDeadline')} />
          <ToggleRow label="Reminder Alerts" checked={settings.deadlines.reminderAlert} onChange={() => toggle('deadlines', 'reminderAlert')} />
        </TeamNotificationPreferenceBox>
        <TeamNotificationPreferenceBox title="Attendance & Reports">
          <ToggleRow label="Check-in Reminder" checked={settings.attendance.checkInReminder} onChange={() => toggle('attendance', 'checkInReminder')} />
          <ToggleRow label="Check-out Reminder" checked={settings.attendance.checkOutReminder} onChange={() => toggle('attendance', 'checkOutReminder')} />
          <ToggleRow label="Daily Report" checked={settings.attendance.dailyReport} onChange={() => toggle('attendance', 'dailyReport')} />
          <ToggleRow label="Report Approval" checked={settings.attendance.reportApproval} onChange={() => toggle('attendance', 'reportApproval')} />
        </TeamNotificationPreferenceBox>
        <TeamNotificationPreferenceBox title="Meetings">
          <ToggleRow label="Meeting Scheduled" checked={settings.meetings.meetingScheduled} onChange={() => toggle('meetings', 'meetingScheduled')} />
          <ToggleRow label="Meeting Reminder" checked={settings.meetings.meetingReminder} onChange={() => toggle('meetings', 'meetingReminder')} />
          <ToggleRow label="Meeting Cancelled" checked={settings.meetings.meetingCancelled} onChange={() => toggle('meetings', 'meetingCancelled')} />
        </TeamNotificationPreferenceBox>
        <TeamNotificationPreferenceBox title="Channels">
          <ToggleRow label="System" checked={settings.channels.system} onChange={() => toggle('channels', 'system')} />
          <ToggleRow label="Email" checked={settings.channels.email} onChange={() => toggle('channels', 'email')} />
          <ToggleRow label="WhatsApp" checked={settings.channels.whatsapp} onChange={() => toggle('channels', 'whatsapp')} />
        </TeamNotificationPreferenceBox>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave(settings)}>Save Preferences</button>
    </div>
  );
};
export default TeamNotificationSettings;