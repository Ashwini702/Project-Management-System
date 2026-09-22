// src/components/meetings/MeetingStatusBadge.jsx
import React from 'react';
const MeetingStatusBadge = ({ status }) => {
  const map = { Scheduled: 'mtg-status-scheduled', Ongoing: 'mtg-status-ongoing', Completed: 'mtg-status-completed', Cancelled: 'mtg-status-cancelled', Rescheduled: 'mtg-status-rescheduled' };
  return <span className={`meeting-status-badge ${map[status] || ''}`}>{status}</span>;
};
export default MeetingStatusBadge;