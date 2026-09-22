// src/components/taskDetails/TaskOverviewCard.jsx
import React from 'react';
import { FiClock, FiUser, FiFolder, FiCalendar, FiCheckSquare } from 'react-icons/fi';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';

const TaskOverviewCard = ({ task }) => (
  <div className="td-overview-card">
    <div className="td-overview-header">
      <h3>{task.title}</h3>
      <div className="td-overview-badges">
        <TaskStatusBadge status={task.status} />
        <TaskPriorityBadge priority={task.priority} />
      </div>
    </div>
    <div className="td-overview-meta">
      <span><FiFolder /> {task.project}</span>
      <span><FiUser /> {task.assignedTo}</span>
      <span><FiCalendar /> {task.startDate} - {task.deadline}</span>
      <span><FiClock /> {task.timeSpent}h / {task.estimatedHours}h</span>
      <span><FiCheckSquare /> {task.checklistCompleted}/{task.checklistTotal} Checklist</span>
    </div>
    <p className="td-overview-desc">{task.description}</p>
    <div className="td-overview-progress">
      <div className="progress-label"><span>Task Progress</span><strong>{task.progress}%</strong></div>
      <div className="progress td-progress"><div className="progress-bar" style={{ width: `${task.progress}%` }}></div></div>
    </div>
  </div>
);

export default TaskOverviewCard;