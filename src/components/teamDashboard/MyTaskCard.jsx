// src/components/teamDashboard/MyTaskCard.jsx
import React from 'react';
import { FiEye, FiEdit3, FiCheck, FiClock, FiMessageSquare, FiCheckSquare } from 'react-icons/fi';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';

const MyTaskCard = ({ task, onView, onUpdateStatus, onMarkComplete }) => (
  <div className="tm-task-card">
    <div className="tm-task-header">
      <h6>{task.title}</h6>
      <div className="tm-task-badges"><TaskPriorityBadge priority={task.priority} /><TaskStatusBadge status={task.status} /></div>
    </div>
    <p className="tm-task-desc">{task.description}</p>
    <div className="tm-task-meta">
      <span>Project: {task.project}</span><span>By: {task.assignedBy}</span><span>Deadline: {task.deadline}</span>
    </div>
    <div className="tm-task-progress">
      <div className="tm-progress-label"><span>Progress</span><strong>{task.progress}%</strong></div>
      <div className="progress tm-progress"><div className="progress-bar" style={{ width: `${task.progress}%` }}></div></div>
    </div>
    <div className="tm-task-stats">
      <span><FiCheckSquare /> {task.completedChecklist}/{task.checklistCount}</span>
      <span><FiMessageSquare /> {task.commentsCount}</span>
      <span><FiClock /> {task.timeSpent}h / {task.estimatedHours}h</span>
    </div>
    <div className="tm-task-actions">
      <button className="tm-btn" onClick={() => onView(task)}><FiEye /> View</button>
      <button className="tm-btn" onClick={() => onUpdateStatus(task)}><FiEdit3 /> Status</button>
      {task.status !== 'Completed' && <button className="tm-btn complete" onClick={() => onMarkComplete(task)}><FiCheck /> Complete</button>}
    </div>
  </div>
);
export default MyTaskCard;