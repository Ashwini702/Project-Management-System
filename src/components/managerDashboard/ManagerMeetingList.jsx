// src/components/managerDashboard/ManagerMeetingList.jsx
import React from 'react';
import { FiVideo, FiUsers, FiMapPin, FiPlay } from 'react-icons/fi';

const ManagerMeetingList = ({ meetings, onAlert }) => (
  <div className="mgr-meeting-list">
    <h6>Upcoming Meetings</h6>
    {meetings.map(m => (
      <div key={m.id} className={`mgr-meeting-item ${m.status === 'Today' ? 'today' : ''}`}>
        <div className="mgr-mt-info">
          <h6>{m.title}</h6>
          <span>{m.project}{m.client ? ` • ${m.client}` : ''}</span>
          <span>{m.date} • {m.time} • {m.mode === 'Online' ? <FiVideo className="me-1" /> : <FiMapPin className="me-1" />}{m.mode}</span>
        </div>
        <div className="mgr-mt-right">
          <span><FiUsers /> {m.participants}</span>
          <button className="mgr-mt-btn" onClick={() => onAlert('Meeting feature is frontend demo only.')}><FiPlay /> Start</button>
        </div>
      </div>
    ))}
  </div>
);
export default ManagerMeetingList;