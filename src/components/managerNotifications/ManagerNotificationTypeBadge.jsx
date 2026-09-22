// src/components/managerNotifications/ManagerNotificationTypeBadge.jsx
import React from 'react';
const ManagerNotificationTypeBadge = ({ type }) => {
  const map = { 'Task Assigned': 'mgn-type-task', 'Task Updated': 'mgn-type-taskupdate', 'Deadline Reminder': 'mgn-type-deadline', 'Project Status Update': 'mgn-type-project', 'Client Feedback': 'mgn-type-feedback', 'Meeting Scheduled': 'mgn-type-meeting', 'Team Update': 'mgn-type-team', 'Report Generated': 'mgn-type-report', 'System Announcement': 'mgn-type-system' };
  return <span className={`mgn-badge ${map[type] || ''}`}>{type}</span>;
};
export default ManagerNotificationTypeBadge;