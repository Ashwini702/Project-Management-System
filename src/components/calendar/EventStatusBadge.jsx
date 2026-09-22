// src/components/calendar/EventStatusBadge.jsx
import React from 'react';

const EventStatusBadge = ({ status }) => {
  const statusMap = {
    'Upcoming': 'evt-status-upcoming',
    'Completed': 'evt-status-completed',
    'Overdue': 'evt-status-overdue',
    'Cancelled': 'evt-status-cancelled'
  };
  return <span className={`event-status-badge ${statusMap[status] || ''}`}>{status}</span>;
};

export default EventStatusBadge;