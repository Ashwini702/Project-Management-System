// src/components/calendar/UpcomingEvents.jsx
import React from 'react';
import { FiClock, FiUser } from 'react-icons/fi';
import EventStatusBadge from './EventStatusBadge';
import EventTypeBadge from './EventTypeBadge';

const UpcomingEvents = ({ events }) => {
  const upcoming = events.filter(e => e.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
  return (
    <div className="upcoming-events-card">
      <h6 className="section-title">Upcoming Events</h6>
      {upcoming.length === 0 ? <p className="text-muted text-center">No upcoming events</p> :
        upcoming.map(e => (
          <div key={e.id} className="upcoming-item">
            <div className="upcoming-header"><EventTypeBadge type={e.type} /><EventStatusBadge status={e.status} /></div>
            <h6 className="upcoming-title">{e.title}</h6>
            <div className="upcoming-meta"><span><FiClock /> {e.date} {e.startTime}</span><span><FiUser /> {e.assignedTo}</span></div>
          </div>
        ))
      }
    </div>
  );
};

export default UpcomingEvents;