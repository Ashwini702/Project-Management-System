// src/components/managerNotifications/ManagerNotificationCard.jsx
import React from 'react';
import { FiEye, FiCheck, FiMail, FiStar, FiArchive, FiTrash2 } from 'react-icons/fi';
import ManagerNotificationTypeBadge from './ManagerNotificationTypeBadge';
import ManagerNotificationStatusBadge from './ManagerNotificationStatusBadge';

const ManagerNotificationCard = ({ notification, onView, onToggleRead, onToggleImportant, onArchive, onDelete }) => (
  <div className={`mgn-card ${!notification.isRead ? 'unread' : ''} ${notification.status === 'Important' ? 'important' : ''}`}>
    <div className="mgn-card-header">
      <ManagerNotificationTypeBadge type={notification.type} />
      <ManagerNotificationStatusBadge status={notification.status} isRead={notification.isRead} />
    </div>
    <h6 className="mgn-card-title">{notification.title}</h6>
    <p className="mgn-card-msg">{notification.message}</p>
    <div className="mgn-card-meta">
      <span>Project: {notification.relatedProject}</span>
      <span>From: {notification.senderName}</span>
    </div>
    <div className="mgn-card-footer">
      <span className="mgn-card-date">{notification.createdAt}</span>
      <div className="mgn-card-actions">
        <button className="mgn-btn" onClick={() => onView(notification)}><FiEye /></button>
        <button className="mgn-btn" onClick={() => onToggleRead(notification)} title={notification.isRead ? 'Mark Unread' : 'Mark Read'}>{notification.isRead ? <FiMail /> : <FiCheck />}</button>
        <button className="mgn-btn" onClick={() => onToggleImportant(notification)}><FiStar /></button>
        <button className="mgn-btn" onClick={() => onArchive(notification)}><FiArchive /></button>
        <button className="mgn-btn delete" onClick={() => onDelete(notification)}><FiTrash2 /></button>
      </div>
    </div>
  </div>
);
export default ManagerNotificationCard;