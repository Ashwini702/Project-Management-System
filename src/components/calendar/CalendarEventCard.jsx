// src/components/calendar/CalendarEventCard.jsx
import React from 'react';
import { FiClock, FiUser, FiFolder, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import EventStatusBadge from './EventStatusBadge';
import EventTypeBadge from './EventTypeBadge';

const CalendarEventCard = ({ event, onView, onEdit, onDelete }) => {
  return (
    <div className="calendar-event-card">
      <div className="event-card-header">
        <EventTypeBadge type={event.type} />
        <div className="event-card-actions">
          <button className="eca-btn" onClick={() => onView(event)}><FiEye /></button>
          <button className="eca-btn" onClick={() => onEdit(event)}><FiEdit2 /></button>
          <button className="eca-btn" onClick={() => onDelete(event)}><FiTrash2 /></button>
        </div>
      </div>
      <h6 className="event-card-title">{event.title}</h6>
      <p className="event-card-desc">{event.description}</p>
      <div className="event-card-meta">
        <span><FiFolder /> {event.project}</span>
        <span><FiUser /> {event.assignedTo}</span>
        <span><FiClock /> {event.date} {event.startTime}</span>
      </div>
      <div className="event-card-footer">
        <EventStatusBadge status={event.status} />
        <span className={`event-priority evt-priority-${event.priority.toLowerCase()}`}>{event.priority}</span>
      </div>
    </div>
  );
};

export default CalendarEventCard;