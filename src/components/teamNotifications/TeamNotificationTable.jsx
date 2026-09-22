// src/components/teamNotifications/TeamNotificationTable.jsx
import React from 'react';
import { FiEye, FiCheck, FiMail, FiStar, FiArchive, FiTrash2 } from 'react-icons/fi';
import TeamNotificationTypeBadge from './TeamNotificationTypeBadge';
import TeamNotificationStatusBadge from './TeamNotificationStatusBadge';

const TeamNotificationTable = ({ notifications, onView, onToggleRead, onToggleImportant, onArchive, onDelete }) => (
  <div className="table-responsive">
    <table className="table tn-table">
      <thead><tr><th>Notification</th><th>Type</th><th>Project</th><th>Related To</th><th>Priority</th><th>Status</th><th>Sender</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>
        {notifications.length === 0 ? <tr><td colSpan="9" className="text-center py-5"><p className="text-muted">No notifications found</p></td></tr> :
          notifications.map(n => (
            <tr key={n.id} className={!n.isRead ? 'row-unread' : ''}>
              <td><div><span className="tn-name">{n.title}</span><small className="d-block text-muted">{n.message.substring(0, 50)}...</small></div></td>
              <td><TeamNotificationTypeBadge type={n.type} /></td><td>{n.relatedProject || '-'}</td><td>{n.relatedTo || '-'}</td>
              <td><span className={`priority-dot priority-${n.priority?.toLowerCase()}`}></span> {n.priority}</td>
              <td><TeamNotificationStatusBadge status={n.status} isRead={n.isRead} /></td>
              <td>{n.senderName}</td><td>{n.createdAt}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(n)}><FiEye /></button>
                <button className="action-btn-icon" onClick={() => onToggleRead(n)}>{n.isRead ? <FiMail /> : <FiCheck />}</button>
                <button className="action-btn-icon" onClick={() => onToggleImportant(n)}><FiStar /></button>
                <button className="action-btn-icon" onClick={() => onArchive(n)}><FiArchive /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(n)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default TeamNotificationTable;