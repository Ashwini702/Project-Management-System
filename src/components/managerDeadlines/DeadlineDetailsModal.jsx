// src/components/managerDeadlines/DeadlineDetailsModal.jsx
import React from 'react';
import { FiX, FiFolder, FiUser, FiClock, FiFlag, FiBell } from 'react-icons/fi';
import DeadlineStatusBadge from './DeadlineStatusBadge';
import DeadlinePriorityBadge from './DeadlinePriorityBadge';

const DeadlineDetailsModal = ({ show, onClose, deadline }) => {
  if (!show || !deadline) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{deadline.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="mdl-detail-badges"><DeadlinePriorityBadge priority={deadline.priority} /><DeadlineStatusBadge status={deadline.status} /><span className="mdl-type-tag">{deadline.type}</span></div>
        <p className="mt-3">{deadline.description}</p>
        <div className="mdl-detail-grid">
          <div><FiFolder /> <strong>Project:</strong> {deadline.project}</div>
          {deadline.relatedTask && <div><FiFlag /> <strong>Task:</strong> {deadline.relatedTask}</div>}
          <div><FiUser /> <strong>Assignee:</strong> {deadline.assignee}</div>
          <div><FiClock /> <strong>Due:</strong> {deadline.dueDate} {deadline.dueTime}</div>
          <div><FiBell /> <strong>Reminder:</strong> {deadline.reminder}</div>
          <div><strong>Days Left:</strong> <span className={deadline.daysRemaining < 0 ? 'text-danger' : ''}>{deadline.daysRemaining < 0 ? `${Math.abs(deadline.daysRemaining)}d overdue` : `${deadline.daysRemaining}d`}</span></div>
        </div>
        <div className="progress mt-3"><div className="progress-bar" style={{ width: `${deadline.progress}%` }}></div></div>
        <p className="mt-2"><strong>Progress:</strong> {deadline.progress}%</p>
        {deadline.notes && <p className="mt-2"><strong>Notes:</strong> {deadline.notes}</p>}
        <p className="mt-2"><small>Created: {deadline.createdDate} | Updated: {deadline.updatedDate}</small></p>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default DeadlineDetailsModal;