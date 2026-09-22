// src/components/teamDashboard/TodayWorkBox.jsx
import React from 'react';
import { FiClock, FiCheck, FiPlay } from 'react-icons/fi';
import TaskPriorityBadge from './TaskPriorityBadge';

const TodayWorkBox = ({ tasks, onComplete, onAlert }) => (
  <div className="tm-today-box">
    <h6>Today's Work</h6>
    {tasks.map(t => (
      <div key={t.id} className="tm-today-item">
        <div className="tm-today-info">
          <span className="tm-today-title">{t.title}</span>
          <span className="tm-today-project">{t.project} • <TaskPriorityBadge priority={t.priority} /></span>
          <span className="tm-today-deadline"><FiClock /> {t.deadline} • {t.estimatedHours}h</span>
        </div>
        <div className="tm-today-actions">
          {t.status === 'Completed' ? <span className="text-success fw-bold">Done ✓</span> : (
            <><button className="tm-btn-sm" onClick={() => onAlert('Work started!', 'info')}><FiPlay /> Start</button>
            <button className="tm-btn-sm complete" onClick={() => onComplete(t.id)}><FiCheck /> Done</button></>
          )}
        </div>
      </div>
    ))}
  </div>
);
export default TodayWorkBox;