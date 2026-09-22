// src/components/teamNotifications/TeamAnnouncementBox.jsx
import React from 'react';
import { FiVolume2, FiEye, FiCheck } from 'react-icons/fi';
import { announcements } from '../../data/teamNotificationsData';

const TeamAnnouncementBox = ({ onAlert }) => (
  <div className="tn-announce-box">
    <h6><FiVolume2 /> Announcements</h6>
    {announcements.map(a => (
      <div key={a.id} className="tn-ann-item">
        <h6>{a.title}</h6>
        <p>{a.message}</p>
        <div className="tn-ann-meta">
          <span>By: {a.postedBy} ({a.postedRole})</span><span>{a.dateTime}</span>
        </div>
        <div className="tn-ann-actions">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View announcement is demo.')}><FiEye /> View</button>
        </div>
      </div>
    ))}
  </div>
);
export default TeamAnnouncementBox;