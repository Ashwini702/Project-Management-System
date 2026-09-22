// src/components/managerMeetings/MeetingStatusBadge.jsx
import React from 'react';
const MeetingStatusBadge = ({ status }) => {
  const map = { 'Scheduled': 'mmt-status-scheduled', 'Ongoing': 'mmt-status-ongoing', 'Completed': 'mmt-status-completed', 'Cancelled': 'mmt-status-cancelled', 'Rescheduled': 'mmt-status-rescheduled' };
  return <span className={`mmt-badge ${map[status] || ''}`}>{status}</span>;
};
export default MeetingStatusBadge;