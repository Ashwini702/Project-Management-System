// src/components/managerMeetings/MeetingTimelineView.jsx
import React from 'react';
import { FiClock, FiUsers, FiMapPin, FiLink } from 'react-icons/fi';
import MeetingStatusBadge from './MeetingStatusBadge';
import MeetingTypeBadge from './MeetingTypeBadge';

const MeetingTimelineView = ({ meetings }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const groups = { Today: [], Tomorrow: [], 'This Week': [], Upcoming: [], Completed: [] };
  meetings.forEach(m => {
    if (m.status === 'Completed') groups['Completed'].push(m);
    else if (m.date === today) groups['Today'].push(m);
    else if (m.date === tomorrow) groups['Tomorrow'].push(m);
    else if (m.date <= weekEnd) groups['This Week'].push(m);
    else groups['Upcoming'].push(m);
  });

  return (
    <div className="mmt-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="mmt-tl-group">
          <h5 className="mmt-tl-group-title">{group} ({items.length})</h5>
          <div className="mmt-tl-items">
            {items.map(m => (
              <div key={m.id} className="mmt-tl-item">
                <div className="mmt-tl-time">{m.startTime}</div>
                <div className="mmt-tl-dot"></div>
                <div className="mmt-tl-card">
                  <div className="mmt-tl-card-header">
                    <h6>{m.title}</h6>
                    <div className="d-flex gap-2"><MeetingTypeBadge type={m.type} /><MeetingStatusBadge status={m.status} /></div>
                  </div>
                  <div className="mmt-tl-meta">
                    <span>{m.project}{m.client ? ` • ${m.client}` : ''}</span>
                    <span>{m.mode === 'Online' ? <FiLink /> : <FiMapPin />} {m.mode}</span>
                    <span><FiUsers /> {m.participants.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MeetingTimelineView;