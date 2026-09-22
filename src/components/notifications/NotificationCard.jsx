// src/components/notifications/NotificationCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiCheck, FiMail } from 'react-icons/fi';
import NotificationTypeBadge from './NotificationTypeBadge';
import NotificationStatusBadge from './NotificationStatusBadge';

const NotificationCard = ({ notification, onView, onEdit, onDelete, onToggleRead }) => (
  <div className={`notification-card ${!notification.isRead ? 'unread' : ''}`}>
    <div className="notif-card-header">
      <NotificationTypeBadge type={notification.type} />
      <NotificationStatusBadge status={notification.status} isRead={notification.isRead} />
    </div>
    <h6 className="notif-card-title">{notification.title}</h6>
    <p className="notif-card-message">{notification.message}</p>
    <div className="notif-card-meta">
      <span>To: {notification.recipientUser}</span>
      {notification.relatedProject && <span>Project: {notification.relatedProject}</span>}
    </div>
    <div className="notif-card-channels">
      {notification.channels.map(ch => <span key={ch} className="channel-tag">{ch}</span>)}
    </div>
    <div className="notif-card-footer">
      <span className="notif-time">{notification.createdAt}</span>
      <div className="notif-card-actions">
        <button className="nca-btn" onClick={() => onView(notification)}><FiEye /></button>
        <button className="nca-btn" onClick={() => onEdit(notification)}><FiEdit2 /></button>
        <button className="nca-btn" onClick={() => onToggleRead(notification)} title={notification.isRead ? 'Mark Unread' : 'Mark Read'}>
          {notification.isRead ? <FiMail /> : <FiCheck />}
        </button>
        <button className="nca-btn" onClick={() => onDelete(notification)}><FiTrash2 /></button>
      </div>
    </div>
  </div>
);

export default NotificationCard;