// src/components/teamNotifications/TeamNotificationCard.jsx
import React from 'react';
import { FiEye, FiCheck, FiMail, FiStar, FiArchive, FiTrash2 } from 'react-icons/fi';
import TeamNotificationTypeBadge from './TeamNotificationTypeBadge';
import TeamNotificationStatusBadge from './TeamNotificationStatusBadge';

const TeamNotificationCard = ({ notification, onView, onToggleRead, onToggleImportant, onArchive, onDelete }) => (
  <div className={`tn-card ${!notification.isRead ? 'unread' : ''} ${notification.status === 'Important' ? 'important' : ''}`}>
    <div className="tn-card-header">
      <TeamNotificationTypeBadge type={notification.type} />
      <TeamNotificationStatusBadge status={notification.status} isRead={notification.isRead} />
    </div>
    <h6 className="tn-card-title">{notification.title}</h6>
    <p className="tn-card-msg">{notification.message}</p>
    <div className="tn-card-meta">
      {notification.relatedProject && <span>Project: {notification.relatedProject}</span>}
      <span>From: {notification.senderName}</span>
    </div>
    <div className="tn-card-footer">
      <span className="tn-card-date">{notification.createdAt}</span>
      <div className="tn-card-actions">
        <button className="tn-btn" onClick={() => onView(notification)}><FiEye /></button>
        <button className="tn-btn" onClick={() => onToggleRead(notification)} title={notification.isRead ? 'Mark Unread' : 'Mark Read'}>{notification.isRead ? <FiMail /> : <FiCheck />}</button>
        <button className="tn-btn" onClick={() => onToggleImportant(notification)}><FiStar /></button>
        <button className="tn-btn" onClick={() => onArchive(notification)}><FiArchive /></button>
        <button className="tn-btn delete" onClick={() => onDelete(notification)}><FiTrash2 /></button>
      </div>
    </div>
  </div>
);
export default TeamNotificationCard;