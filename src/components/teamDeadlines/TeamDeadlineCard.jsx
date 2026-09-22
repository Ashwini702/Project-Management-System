// src/components/teamDeadlines/TeamDeadlineCard.jsx
import React from 'react';
import { FiEye, FiBell, FiCheck, FiEdit2, FiClock, FiFolder, FiUser } from 'react-icons/fi';
import TeamDeadlineStatusBadge from './TeamDeadlineStatusBadge';
import TeamDeadlinePriorityBadge from './TeamDeadlinePriorityBadge';
import TeamDeadlineProgressBar from './TeamDeadlineProgressBar';

const TeamDeadlineCard = ({ deadline, onView, onReminder, onMarkComplete, onAddNote }) => (
  <div className={`td-card ${deadline.status === 'Overdue' || deadline.status === 'Missed' ? 'overdue' : ''}`}>
    <div className="td-card-header">
      <h6>{deadline.title}</h6>
      <div className="td-card-badges"><TeamDeadlinePriorityBadge priority={deadline.priority} /><TeamDeadlineStatusBadge status={deadline.status} /></div>
    </div>
    <p className="td-card-desc">{deadline.description}</p>
    <div className="td-card-meta">
      <span><FiFolder /> {deadline.projectName}</span>
      <span><FiUser /> {deadline.assignedBy}</span>
    </div>
    <div className="td-card-date">
      <span><FiClock /> {deadline.dueDate} {deadline.dueTime}</span>
      <span className={`td-card-days ${deadline.daysRemaining < 0 ? 'text-danger' : deadline.daysRemaining <= 1 ? 'text-warning' : ''}`}>
        {deadline.daysRemaining === null || deadline.daysRemaining === undefined
          ? 'No due date'
          : deadline.daysRemaining < 0
            ? `${Math.abs(deadline.daysRemaining)}d overdue`
            : deadline.daysRemaining === 0
              ? 'Due today'
              : `${deadline.daysRemaining}d left`}
      </span>
    </div>
    <div className="td-card-progress">
      <div className="td-progress-label"><span>Progress</span><strong>{deadline.progress}%</strong></div>
      <TeamDeadlineProgressBar progress={deadline.progress} />
    </div>
    <div className="td-card-type"><span className="td-type-tag">{deadline.type}</span></div>
    <div className="td-card-actions">
      <button className="td-btn" onClick={() => onView(deadline)}><FiEye /></button>
      <button className="td-btn" onClick={() => onReminder(deadline)}><FiBell /></button>
      {deadline.status !== 'Completed' && <button className="td-btn complete" onClick={() => onMarkComplete(deadline)}><FiCheck /></button>}
      <button className="td-btn" onClick={() => onAddNote(deadline)}><FiEdit2 /></button>
    </div>
  </div>
);
export default TeamDeadlineCard;