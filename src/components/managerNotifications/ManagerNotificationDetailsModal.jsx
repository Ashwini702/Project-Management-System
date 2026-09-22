// src/components/managerNotifications/ManagerNotificationDetailsModal.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import ManagerNotificationTypeBadge from './ManagerNotificationTypeBadge';
import ManagerNotificationStatusBadge from './ManagerNotificationStatusBadge';

const ManagerNotificationDetailsModal = ({ show, onClose, notification, onAlert }) => {
  if (!show || !notification) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{notification.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="mgn-detail-badges"><ManagerNotificationTypeBadge type={notification.type} /><ManagerNotificationStatusBadge status={notification.status} isRead={notification.isRead} /></div>
        <p className="mt-3">{notification.message}</p>
        <div className="mgn-detail-grid">
          <div><strong>Project:</strong> {notification.relatedProject}</div>
          <div><strong>Related:</strong> {notification.relatedTo}</div>
          <div><strong>Sender:</strong> {notification.senderName} ({notification.senderRole})</div>
          <div><strong>Priority:</strong> {notification.priority}</div>
          <div><strong>Date:</strong> {notification.createdAt}</div>
          {notification.actionRequired && <div><strong>Action:</strong> {notification.actionRequired}</div>}
          {notification.notes && <div><strong>Notes:</strong> {notification.notes}</div>}
        </div>
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('Go to Project is frontend demo.')}>Go to Project</button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('Go to Task is frontend demo.')}>Go to Task</button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('Reply is frontend demo.')}>Reply</button>
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default ManagerNotificationDetailsModal;