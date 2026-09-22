// src/components/notifications/AnnouncementBox.jsx
import React from 'react';
import { FiVolume2, FiClock } from 'react-icons/fi';

const AnnouncementBox = ({ announcements, onCreate }) => (
  <div className="announcement-box">
    <div className="ann-header">
      <h6><FiVolume2 /> Announcements</h6>
      <button className="btn btn-sm btn-primary" onClick={onCreate}>Create</button>
    </div>
    <div className="ann-list">
      {announcements.map(a => (
        <div key={a.id} className="ann-item">
          <h6>{a.title}</h6>
          <p>{a.message}</p>
          <div className="ann-meta"><span>By: {a.postedBy}</span><span><FiClock /> {a.date}</span><span className={`priority-dot priority-${a.priority.toLowerCase()}`}></span> {a.priority}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AnnouncementBox;