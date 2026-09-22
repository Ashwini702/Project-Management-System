// src/components/teamTasks/TeamTaskCard.jsx
import React from 'react';
import { FiEye, FiEdit3, FiEdit2, FiSend, FiCheck, FiClock, FiFolder, FiUser, FiList, FiMessageSquare } from 'react-icons/fi';
import TeamTaskStatusBadge from './TeamTaskStatusBadge';
import TeamTaskPriorityBadge from './TeamTaskPriorityBadge';
import TeamTaskProgressBar from './TeamTaskProgressBar';

const TeamTaskCard = ({ task, onView, onUpdate, onAddNote, onSubmitReview, onMarkComplete }) => (
  <div className="tt-card">
    <div className="tt-card-header">
      <h6>{task.taskTitle}</h6>
      <div className="tt-card-badges"><TeamTaskPriorityBadge priority={task.priority} /><TeamTaskStatusBadge status={task.status} /></div>
    </div>
    <p className="tt-card-desc">{task.description}</p>
    <div className="tt-card-meta">
      <span><FiFolder /> {task.projectName}</span>
      <span><FiUser /> {task.assignedBy}</span>
      <span><FiClock /> {task.deadline}</span>
    </div>
    <div className="tt-card-progress">
      <div className="tt-progress-label"><span>Progress</span><strong>{task.progress}%</strong></div>
      <TeamTaskProgressBar progress={task.progress} />
    </div>
    <div className="tt-card-stats">
      <span><FiList /> {task.completedChecklist}/{task.checklistCount}</span>
      <span><FiMessageSquare /> {task.commentsCount}</span>
      <span><FiClock /> {task.timeSpent}h/{task.estimatedHours}h</span>
    </div>
    <div className="tt-card-actions">
      <button className="tt-btn" onClick={() => onView(task)}><FiEye /></button>
      <button className="tt-btn" onClick={() => onUpdate(task)}><FiEdit3 /></button>
      <button className="tt-btn" onClick={() => onAddNote(task)}><FiEdit2 /></button>
      {task.status !== 'Under Review' && task.status !== 'Completed' && <button className="tt-btn review" onClick={() => onSubmitReview(task)}><FiSend /></button>}
      {task.status !== 'Completed' && <button className="tt-btn complete" onClick={() => onMarkComplete(task)}><FiCheck /></button>}
    </div>
  </div>
);
export default TeamTaskCard;