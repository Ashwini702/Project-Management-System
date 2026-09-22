// src/components/activityLogs/ActivityDetailsModal.jsx
import React from 'react';
import { FiX, FiUser, FiMail, FiShield, FiMonitor, FiMapPin, FiClock, FiGlobe, FiSmartphone } from 'react-icons/fi';
import ActivityTypeBadge from './ActivityTypeBadge';
import ActivityStatusBadge from './ActivityStatusBadge';

const ActivityDetailsModal = ({ show, onClose, activity }) => {
  if (!show || !activity) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Activity Details</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="act-detail-header"><ActivityTypeBadge type={activity.activityType} /><ActivityStatusBadge status={activity.status} /><span className="act-id">ID: {activity.id}</span></div>
        <h6 className="mt-3">{activity.title}</h6>
        <p className="text-muted">{activity.message}</p>
        <div className="act-detail-grid">
          <div><FiUser /><strong>User:</strong> {activity.userName}</div>
          <div><FiMail /><strong>Email:</strong> {activity.userEmail}</div>
          <div><FiShield /><strong>Role:</strong> {activity.userRole}</div>
          <div><FiMonitor /><strong>Module:</strong> {activity.module}</div>
          <div><FiGlobe /><strong>IP:</strong> {activity.ipAddress}</div>
          <div><FiSmartphone /><strong>Device:</strong> {activity.device}</div>
          <div><strong>Browser:</strong> {activity.browser}</div>
          <div><FiMapPin /><strong>Location:</strong> {activity.location}</div>
          <div><FiClock /><strong>Date/Time:</strong> {activity.dateTime}</div>
          {activity.oldValue && <div><strong>Old Value:</strong> {activity.oldValue}</div>}
          {activity.newValue && <div><strong>New Value:</strong> {activity.newValue}</div>}
          {activity.relatedItem && <div><strong>Related:</strong> {activity.relatedItem}</div>}
          {activity.notes && <div><strong>Notes:</strong> {activity.notes}</div>}
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};

export default ActivityDetailsModal;