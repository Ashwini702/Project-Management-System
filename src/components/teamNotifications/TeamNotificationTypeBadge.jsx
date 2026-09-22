// src/components/teamNotifications/TeamNotificationTypeBadge.jsx
import React from 'react';
const TeamNotificationTypeBadge = ({ type }) => {
  const map = { 'Task Assigned': 'tn-type-task', 'Task Updated': 'tn-type-taskupdate', 'Deadline Reminder': 'tn-type-deadline', 'Project Update': 'tn-type-project', 'Daily Report Reminder': 'tn-type-report', 'Attendance Alert': 'tn-type-attendance', 'Meeting Alert': 'tn-type-meeting', 'Manager Message': 'tn-type-manager', 'Admin Announcement': 'tn-type-announce', 'System Notification': 'tn-type-system' };
  return <span className={`tn-badge ${map[type] || ''}`}>{type}</span>;
};
export default TeamNotificationTypeBadge;