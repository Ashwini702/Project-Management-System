// src/components/teamProfile/TeamNotificationPreferences.jsx
import React, { useState } from 'react';
import { notificationPreferences } from '../../data/teamProfileData';

const TeamNotificationPreferences = ({ onSave }) => {
  const [prefs, setPrefs] = useState(notificationPreferences);
  const toggle = (section, key) => setPrefs(p => ({ ...p, [section]: { ...p[section], [key]: !p[section][key] } }));

  const ToggleRow = ({ label, checked, onChange }) => (
    <div className="tprof-toggle-row"><span>{label}</span><label className="toggle-switch"><input type="checkbox" checked={checked} onChange={onChange} /><span className="toggle-slider"></span></label></div>
  );

  return (
    <div>
      <div className="tprof-settings-grid">
        <div className="tprof-info-card"><h6>Tasks</h6><ToggleRow label="New Assigned" checked={prefs.tasks.taskAssigned} onChange={() => toggle('tasks', 'taskAssigned')} /><ToggleRow label="Updated" checked={prefs.tasks.taskUpdated} onChange={() => toggle('tasks', 'taskUpdated')} /><ToggleRow label="Deadline" checked={prefs.tasks.taskDeadline} onChange={() => toggle('tasks', 'taskDeadline')} /><ToggleRow label="Review" checked={prefs.tasks.taskReview} onChange={() => toggle('tasks', 'taskReview')} /></div>
        <div className="tprof-info-card"><h6>Projects</h6><ToggleRow label="Updates" checked={prefs.projects.projectUpdate} onChange={() => toggle('projects', 'projectUpdate')} /><ToggleRow label="File Uploads" checked={prefs.projects.fileUpload} onChange={() => toggle('projects', 'fileUpload')} /><ToggleRow label="Milestones" checked={prefs.projects.milestone} onChange={() => toggle('projects', 'milestone')} /></div>
        <div className="tprof-info-card"><h6>Attendance</h6><ToggleRow label="Check-in" checked={prefs.attendance.checkInReminder} onChange={() => toggle('attendance', 'checkInReminder')} /><ToggleRow label="Check-out" checked={prefs.attendance.checkOutReminder} onChange={() => toggle('attendance', 'checkOutReminder')} /><ToggleRow label="Approval" checked={prefs.attendance.attendanceApproval} onChange={() => toggle('attendance', 'attendanceApproval')} /></div>
        <div className="tprof-info-card"><h6>Reports</h6><ToggleRow label="Reminder" checked={prefs.reports.reportReminder} onChange={() => toggle('reports', 'reportReminder')} /><ToggleRow label="Approval" checked={prefs.reports.reportApproval} onChange={() => toggle('reports', 'reportApproval')} /><ToggleRow label="Rejection" checked={prefs.reports.reportRejection} onChange={() => toggle('reports', 'reportRejection')} /></div>
        <div className="tprof-info-card"><h6>Deadlines</h6><ToggleRow label="Today" checked={prefs.deadlines.todayDeadline} onChange={() => toggle('deadlines', 'todayDeadline')} /><ToggleRow label="Upcoming" checked={prefs.deadlines.upcomingDeadline} onChange={() => toggle('deadlines', 'upcomingDeadline')} /><ToggleRow label="Overdue" checked={prefs.deadlines.overdueAlert} onChange={() => toggle('deadlines', 'overdueAlert')} /></div>
        <div className="tprof-info-card"><h6>Channels</h6><ToggleRow label="System" checked={prefs.channels.system} onChange={() => toggle('channels', 'system')} /><ToggleRow label="Email" checked={prefs.channels.email} onChange={() => toggle('channels', 'email')} /><ToggleRow label="WhatsApp" checked={prefs.channels.whatsapp} onChange={() => toggle('channels', 'whatsapp')} /></div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave(prefs)}>Save Preferences</button>
    </div>
  );
};
export default TeamNotificationPreferences;