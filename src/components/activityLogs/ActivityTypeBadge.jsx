// src/components/activityLogs/ActivityTypeBadge.jsx
import React from 'react';

const ActivityTypeBadge = ({ type }) => {
  const map = {
    'Login': 'act-type-login', 'Logout': 'act-type-logout', 'Project Created': 'act-type-create',
    'Project Updated': 'act-type-update', 'Project Deleted': 'act-type-delete', 'Task Created': 'act-type-create',
    'Task Updated': 'act-type-update', 'Task Deleted': 'act-type-delete', 'User Added': 'act-type-create',
    'User Updated': 'act-type-update', 'User Deleted': 'act-type-delete', 'File Uploaded': 'act-type-upload',
    'File Deleted': 'act-type-delete', 'Report Exported': 'act-type-export', 'Security Alert': 'act-type-security'
  };
  return <span className={`activity-type-badge ${map[type] || ''}`}>{type}</span>;
};

export default ActivityTypeBadge;