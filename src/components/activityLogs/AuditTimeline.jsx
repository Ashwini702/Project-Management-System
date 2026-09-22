// src/components/activityLogs/AuditTimeline.jsx
import React from 'react';
import { FiClock, FiUser } from 'react-icons/fi';
import ActivityTypeBadge from './ActivityTypeBadge';

const AuditTimeline = ({ activities }) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const groups = { Today: [], Yesterday: [], 'This Week': [], Older: [] };

  activities.forEach(a => {
    const d = a.dateTime.split(' ')[0];
    if (d === today) groups['Today'].push(a);
    else if (d === yesterday) groups['Yesterday'].push(a);
    else if (new Date(d) > new Date(Date.now() - 7 * 86400000)) groups['This Week'].push(a);
    else groups['Older'].push(a);
  });

  const getDotColor = (status) => {
    if (status === 'Success') return 'var(--success-color)';
    if (status === 'Warning') return 'var(--warning-color)';
    if (status === 'Failed') return 'var(--danger-color)';
    return 'var(--accent-purple)';
  };

  return (
    <div className="audit-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="timeline-group">
          <h5 className="timeline-group-title">{group} ({items.length})</h5>
          <div className="timeline-items">
            {items.map(a => (
              <div key={a.id} className="timeline-row">
                <div className="timeline-time">{a.dateTime.split(' ')[1]}</div>
                <div className="timeline-dot" style={{ backgroundColor: getDotColor(a.status) }}></div>
                <div className="timeline-content">
                  <div className="timeline-content-header">
                    <h6>{a.title}</h6>
                    <ActivityTypeBadge type={a.activityType} />
                  </div>
                  <p className="timeline-msg">{a.message}</p>
                  <div className="timeline-meta"><span><FiUser /> {a.userName}</span><span>{a.module}</span><span>{a.ipAddress}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditTimeline;
