// src/components/teamDashboard/TeamNotificationList.jsx
import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { teamNotifications } from '../../data/teamDashboardData';

const TeamNotificationList = ({ onAlert }) => {
  const [notifs, setNotifs] = useState(teamNotifications);

  const markAllRead = () => { setNotifs(notifs.map(n => ({ ...n, isRead: true }))); onAlert('All marked as read!', 'success'); };

  return (
    <div className="tm-notif-list">
      <div className="tm-notif-header"><h6>Notifications</h6><button className="btn btn-sm btn-link" onClick={markAllRead}><FiCheck /> Mark All Read</button></div>
      {notifs.map(n => (
        <div key={n.id} className={`tm-notif-item ${!n.isRead ? 'unread' : ''}`}>
          <div><strong>{n.title}</strong><p>{n.message}</p><span>{n.type} • {n.time}</span></div>
        </div>
      ))}
    </div>
  );
};
export default TeamNotificationList;