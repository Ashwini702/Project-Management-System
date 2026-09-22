// src/components/notifications/NotificationTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiCheck, FiMail } from 'react-icons/fi';
import NotificationTypeBadge from './NotificationTypeBadge';
import NotificationStatusBadge from './NotificationStatusBadge';

const NotificationTable = ({ notifications, onView, onEdit, onDelete, onToggleRead }) => (
  <div className="table-responsive">
    <table className="table notif-table">
      <thead><tr><th>Notification</th><th>Type</th><th>Recipient</th><th>Related To</th><th>Channel</th><th>Priority</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
      <tbody>
        {notifications.length === 0 ? <tr><td colSpan="9" className="text-center py-5"><p className="text-muted">No notifications found</p></td></tr> :
          notifications.map(n => (
            <tr key={n.id} className={!n.isRead ? 'row-unread' : ''}>
              <td><div><span className="notif-name">{n.title}</span><small className="d-block text-muted">{n.message.substring(0, 50)}...</small></div></td>
              <td><NotificationTypeBadge type={n.type} /></td><td>{n.recipientUser}</td>
              <td>{n.relatedProject || n.relatedTask || '-'}</td>
              <td><div className="channel-tags">{n.channels.map(ch => <span key={ch} className="channel-tag">{ch}</span>)}</div></td>
              <td><span className={`priority-dot priority-${n.priority.toLowerCase()}`}></span> {n.priority}</td>
              <td><NotificationStatusBadge status={n.status} isRead={n.isRead} /></td><td>{n.createdAt}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(n)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(n)}><FiEdit2 /></button>
                <button className="action-btn-icon toggle-btn" onClick={() => onToggleRead(n)}>{n.isRead ? <FiMail /> : <FiCheck />}</button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(n)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default NotificationTable;