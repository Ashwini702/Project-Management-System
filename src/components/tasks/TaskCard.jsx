// src/components/tasks/TaskCard.jsx
import React from 'react';
import { FiClock, FiUser, FiFolder, FiEye, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';
import TaskProgressBar from './TaskProgressBar';

const TaskCard = ({ task, onView, onEdit, onDelete, onMarkComplete }) => {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-card-actions">
          <button className="tca-btn" onClick={() => onView(task)} title="View">
            <FiEye />
          </button>
          <button className="tca-btn" onClick={() => onEdit(task)} title="Edit">
            <FiEdit2 />
          </button>
          <button className="tca-btn" onClick={() => onDelete(task)} title="Delete">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="task-card-body">
        <h5 className="task-card-title">{task.title}</h5>
        <p className="task-card-desc">{task.description}</p>

        <div className="task-card-meta">
          <div className="task-meta-item">
            <FiFolder className="meta-icon" />
            <span>{task.project}</span>
          </div>
          <div className="task-meta-item">
            <FiUser className="meta-icon" />
            <span>{task.assignee}</span>
          </div>
          <div className="task-meta-item">
            <FiClock className="meta-icon" />
            <span>{task.deadline}</span>
          </div>
        </div>

        <div className="task-card-badges">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>

        <div className="task-progress-section">
          <TaskProgressBar progress={task.progress} />
        </div>

        <div className="task-card-footer">
          <div className="task-footer-stats">
            <span className="footer-stat">
              <FiCheck /> {task.completedChecklist}/{task.checklistCount} Checklist
            </span>
            <span className="footer-stat">
              💬 {task.commentsCount} Comments
            </span>
          </div>
          <div className="task-time-spent">
            <FiClock /> {task.timeSpent}h / {task.estimatedHours}h
          </div>
        </div>

        {task.status !== 'Completed' && (
          <button 
            className="btn btn-success btn-sm w-100 mt-3 mark-complete-btn"
            onClick={() => onMarkComplete(task)}
          >
            <FiCheck /> Mark Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;