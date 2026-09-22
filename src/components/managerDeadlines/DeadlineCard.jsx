// src/components/managerDeadlines/DeadlineCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiCheck, FiBell, FiTrash2, FiClock, FiUser, FiFolder } from 'react-icons/fi';
import DeadlineStatusBadge from './DeadlineStatusBadge';
import DeadlinePriorityBadge from './DeadlinePriorityBadge';

const DeadlineCard = ({ deadline, onView, onEdit, onMarkComplete, onSendReminder, onDelete }) => (
  <div className={`mdl-card ${deadline.status === 'Overdue' ? 'overdue' : ''}`}>
    <div className="mdl-card-header">
      <h6>{deadline.title}</h6>
      <div className="mdl-card-badges">
        <DeadlinePriorityBadge priority={deadline.priority} />
        <DeadlineStatusBadge status={deadline.status} />
      </div>
    </div>
    <p className="mdl-card-desc">{deadline.description}</p>
    <div className="mdl-card-meta">
      <span><FiFolder /> {deadline.project}</span>
      <span><FiUser /> {deadline.assignee}</span>
    </div>
    <div className="mdl-card-date">
      <span><FiClock /> {deadline.dueDate} {deadline.dueTime}</span>
      <span className={`mdl-card-days ${deadline.daysRemaining < 0 ? 'text-danger' : deadline.daysRemaining <= 1 ? 'text-warning' : ''}`}>
        {deadline.daysRemaining < 0 ? `${Math.abs(deadline.daysRemaining)}d overdue` : `${deadline.daysRemaining}d left`}
      </span>
    </div>
    <div className="mdl-card-progress">
      <div className="mdl-progress-label"><span>Progress</span><strong>{deadline.progress}%</strong></div>
      <div className="progress mdl-progress"><div className="progress-bar" style={{ width: `${deadline.progress}%` }}></div></div>
    </div>
    <div className="mdl-card-type">
      <span className="mdl-type-tag">{deadline.type}</span>
    </div>
    <div className="mdl-card-actions">
      <button className="mdl-btn" onClick={() => onView(deadline)}><FiEye /></button>
      <button className="mdl-btn" onClick={() => onEdit(deadline)}><FiEdit2 /></button>
      {deadline.status !== 'Completed' && <button className="mdl-btn complete" onClick={() => onMarkComplete(deadline)}><FiCheck /></button>}
      <button className="mdl-btn" onClick={() => onSendReminder(deadline)}><FiBell /></button>
      <button className="mdl-btn delete" onClick={() => onDelete(deadline)}><FiTrash2 /></button>
    </div>
  </div>
);
export default DeadlineCard;