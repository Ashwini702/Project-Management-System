// src/components/meetings/MeetingTypeBadge.jsx
import React from 'react';
const MeetingTypeBadge = ({ type }) => {
  const map = { 'Internal Meeting': 'mtg-type-internal', 'Client Meeting': 'mtg-type-client', 'Project Review': 'mtg-type-review', 'Daily Standup': 'mtg-type-standup', 'Sprint Planning': 'mtg-type-sprint', 'Demo Meeting': 'mtg-type-demo', 'Training Meeting': 'mtg-type-training' };
  return <span className={`meeting-type-badge ${map[type] || ''}`}>{type}</span>;
};
export default MeetingTypeBadge;