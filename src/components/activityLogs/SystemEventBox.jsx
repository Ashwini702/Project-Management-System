// src/components/activityLogs/SystemEventBox.jsx
import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';

const SystemEventBox = ({ events }) => {
  const getIcon = (severity) => {
    if (severity === 'Critical') return <FiAlertTriangle className="sev-critical" />;
    if (severity === 'Warning') return <FiAlertCircle className="sev-warning" />;
    return <FiCheckCircle className="sev-success" />;
  };

  return (
    <div className="system-event-box">
      <h6><FiAlertTriangle /> System Events</h6>
      <div className="event-list">
        {events.map(e => (
          <div key={e.id} className={`event-item ${e.severity.toLowerCase()}`}>
            <div className="event-icon">{getIcon(e.severity)}</div>
            <div className="event-content">
              <h6>{e.title} <span className={`severity-tag sev-${e.severity.toLowerCase()}`}>{e.severity}</span></h6>
              <p>{e.description}</p>
              <div className="event-meta"><span>User: {e.relatedUser}</span><span><FiClock /> {e.dateTime}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemEventBox;
