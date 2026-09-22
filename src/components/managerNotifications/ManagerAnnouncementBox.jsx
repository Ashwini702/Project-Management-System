// src/components/managerNotifications/ManagerAnnouncementBox.jsx
import React from 'react';
import { FiVolume2, FiEye, FiCheck } from 'react-icons/fi';

const ManagerAnnouncementBox = ({ announcements, onAlert }) => (
  <div className="mgn-announce-box">
    <h6><FiVolume2 /> Announcements</h6>
    {announcements.map(a => (
      <div key={a.id} className="mgn-ann-item">
        <h6>{a.title}</h6>
        <p>{a.message}</p>
        <div className="mgn-ann-meta">
          <span>By: {a.postedBy}</span><span>{a.dateTime}</span>
        </div>
        <div className="mgn-ann-actions">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View announcement is frontend demo.')}><FiEye /> View</button>
        </div>
      </div>
    ))}
  </div>
);
export default ManagerAnnouncementBox;