// src/components/calendar/EventTypeBadge.jsx
import React from 'react';

const EventTypeBadge = ({ type }) => {
  const typeMap = {
    'Project Deadline': 'evt-type-deadline',
    'Task Deadline': 'evt-type-task',
    'Meeting': 'evt-type-meeting',
    'Milestone': 'evt-type-milestone',
    'Reminder': 'evt-type-reminder',
    'Review': 'evt-type-review'
  };
  return <span className={`event-type-badge ${typeMap[type] || ''}`}>{type}</span>;
};

export default EventTypeBadge;