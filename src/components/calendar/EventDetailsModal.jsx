// src/components/calendar/EventDetailsModal.jsx
import React from 'react';
import { FiX, FiClock, FiUser, FiFolder, FiFlag } from 'react-icons/fi';
import EventStatusBadge from './EventStatusBadge';
import EventTypeBadge from './EventTypeBadge';

const EventDetailsModal = ({ show, onClose, event }) => {
  if (!show || !event) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{event.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="event-detail-header"><EventTypeBadge type={event.type} /><EventStatusBadge status={event.status} /><span className={`event-priority evt-priority-${event.priority.toLowerCase()}`}>{event.priority}</span></div>
        {event.description && <p className="mt-3">{event.description}</p>}
        <div className="event-detail-grid mt-3">
          <div><FiFolder /><strong>Project:</strong> {event.project}</div>
          {event.relatedTask && <div><FiFlag /><strong>Task:</strong> {event.relatedTask}</div>}
          <div><FiUser /><strong>Assigned:</strong> {event.assignedTo}</div>
          <div><FiClock /><strong>Date:</strong> {event.date}</div>
          <div><FiClock /><strong>Time:</strong> {event.startTime} - {event.endTime}</div>
          <div><strong>Reminder:</strong> {event.reminder}</div>
          <div><strong>Created:</strong> {event.createdDate}</div>
        </div>
        {event.notes && <div className="mt-3"><strong>Notes:</strong><p className="text-muted">{event.notes}</p></div>}
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};

export default EventDetailsModal;