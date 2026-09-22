// src/components/managerTasks/ManagerTaskCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiEdit3, FiCheck, FiTrash2, FiClock, FiFolder, FiUser, FiCheckSquare, FiMessageSquare } from 'react-icons/fi';
import ManagerTaskStatusBadge from './ManagerTaskStatusBadge';
import ManagerTaskPriorityBadge from './ManagerTaskPriorityBadge';

const ManagerTaskCard = ({ task, onView, onEdit, onUpdateStatus, onMarkComplete, onDelete }) => (
  <div className="mt-task-card">
    <div className="mt-card-header">
      <h6>{task.title}</h6>
      <div className="mt-card-badges"><ManagerTaskPriorityBadge priority={task.priority} /><ManagerTaskStatusBadge status={task.status} /></div>
    </div>
    <p className="mt-card-desc">{task.description}</p>
    <div className="mt-card-meta">
      <span><FiFolder /> {task.project}</span><span><FiUser /> {task.assignee}</span>
    </div>
    <div className="mt-card-dates">
      <span>Start: {task.startDate}</span><span>Deadline: {task.deadline}</span>
    </div>
    <div className="mt-card-progress">
      <div className="mt-progress-label"><span>Progress</span><strong>{task.progress}%</strong></div>
      <div className="progress mt-progress"><div className="progress-bar" style={{ width: `${task.progress}%` }}></div></div>
    </div>
    <div className="mt-card-stats">
      <span><FiClock /> {task.timeSpent}h/{task.estimatedHours}h</span>
      <span><FiCheckSquare /> {task.completedChecklist}/{task.checklistCount}</span>
      <span><FiMessageSquare /> {task.commentsCount}</span>
    </div>
    <div className="mt-card-actions">
      <button className="mt-btn" onClick={() => onView(task)}><FiEye /> View</button>
      <button className="mt-btn" onClick={() => onEdit(task)}><FiEdit2 /> Edit</button>
      <button className="mt-btn" onClick={() => onUpdateStatus(task)}><FiEdit3 /> Status</button>
      {task.status !== 'Completed' && <button className="mt-btn complete" onClick={() => onMarkComplete(task)}><FiCheck /> Complete</button>}
      <button className="mt-btn delete" onClick={() => onDelete(task)}><FiTrash2 /></button>
    </div>
  </div>
);

export default ManagerTaskCard;
