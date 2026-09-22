// src/components/managerTasks/ManagerTaskKanban.jsx
import React from 'react';
import { FiFolder, FiUser, FiClock } from 'react-icons/fi';
import ManagerTaskPriorityBadge from './ManagerTaskPriorityBadge';

const columns = ['Pending', 'In Progress', 'Under Review', 'Completed', 'Blocked'];

const ManagerTaskKanban = ({ tasks }) => (
  <div className="mt-kanban">
    {columns.map(col => (
      <div key={col} className="mt-kanban-col">
        <div className="mt-kanban-header"><h6>{col}</h6><span className="mt-kanban-count">{tasks.filter(t => t.status === col).length}</span></div>
        <div className="mt-kanban-cards">
          {tasks.filter(t => t.status === col).map(t => (
            <div key={t.id} className="mt-kanban-card">
              <div className="mt-kc-title">{t.title}</div>
              <div className="mt-kc-meta"><span><FiFolder /> {t.project}</span><span><FiUser /> {t.assignee}</span></div>
              <div className="mt-kc-footer">
                <ManagerTaskPriorityBadge priority={t.priority} />
                <span><FiClock /> {t.deadline}</span>
              </div>
              <div className="progress mt-1"><div className="progress-bar" style={{ width: `${t.progress}%` }}></div></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ManagerTaskKanban;