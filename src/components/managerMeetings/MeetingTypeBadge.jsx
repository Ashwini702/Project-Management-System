// src/components/managerMeetings/MeetingTypeBadge.jsx
import React from 'react';
const MeetingTypeBadge = ({ type }) => {
  const map = { 'Internal Meeting': 'mmt-type-internal', 'Client Meeting': 'mmt-type-client', 'Project Review': 'mmt-type-review', 'Daily Standup': 'mmt-type-standup', 'Sprint Planning': 'mmt-type-sprint', 'Demo Meeting': 'mmt-type-demo', 'Training Meeting': 'mmt-type-training' };
  return <span className={`mmt-badge ${map[type] || ''}`}>{type}</span>;
};
export default MeetingTypeBadge;