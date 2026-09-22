// src/components/teamDeadlines/TeamDeadlineDetailsModal.jsx
import React from 'react';
import { FiX, FiFolder, FiUser, FiClock, FiBell } from 'react-icons/fi';
import TeamDeadlineStatusBadge from './TeamDeadlineStatusBadge';
import TeamDeadlinePriorityBadge from './TeamDeadlinePriorityBadge';
import TeamDeadlineProgressBar from './TeamDeadlineProgressBar';

const TeamDeadlineDetailsModal = ({ show, onClose, deadline }) => {
  if (!show || !deadline) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{deadline.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="td-detail-badges"><TeamDeadlinePriorityBadge priority={deadline.priority} /><TeamDeadlineStatusBadge status={deadline.status} /></div>
        <p className="mt-3">{deadline.description}</p>
        <div className="td-detail-grid">
          <div><FiFolder /><strong>Project:</strong> {deadline.projectName}</div>
          <div><FiUser /><strong>Assigned By:</strong> {deadline.assignedBy}</div>
          <div><FiClock /><strong>Due:</strong> {deadline.dueDate} {deadline.dueTime}</div>
          <div><strong>Type:</strong> {deadline.type}</div>
          <div><strong>Days Left:</strong> <span className={deadline.daysRemaining < 0 ? 'text-danger' : ''}>{deadline.daysRemaining < 0 ? `${Math.abs(deadline.daysRemaining)}d overdue` : `${deadline.daysRemaining}d`}</span></div>
          <div><FiBell /><strong>Reminder:</strong> {deadline.reminderStatus}</div>
        </div>
        <div className="mt-3"><strong>Progress:</strong> {deadline.progress}% <TeamDeadlineProgressBar progress={deadline.progress} /></div>
        {deadline.note && <p className="mt-3"><strong>Note:</strong> {deadline.note}</p>}
        <p className="mt-2"><small>Last Updated: {deadline.lastUpdated}</small></p>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default TeamDeadlineDetailsModal;