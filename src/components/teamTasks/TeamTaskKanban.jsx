// src/components/teamTasks/TeamTaskKanban.jsx
import React from 'react';
import { FiFolder, FiClock, FiUser } from 'react-icons/fi';
import TeamTaskPriorityBadge from './TeamTaskPriorityBadge';
import TeamTaskProgressBar from './TeamTaskProgressBar';

const columns = ['Pending', 'In Progress', 'Under Review', 'Completed', 'Blocked'];

const TeamTaskKanban = ({ tasks }) => (
  <div className="tt-kanban">
    {columns.map(col => (
      <div key={col} className="tt-kanban-col">
        <div className="tt-kanban-header"><h6>{col}</h6><span className="tt-kanban-count">{tasks.filter(t => t.status === col).length}</span></div>
        <div className="tt-kanban-cards">
          {tasks.filter(t => t.status === col).map(t => (
            <div key={t.id} className="tt-kanban-card">
              <div className="tt-kc-title">{t.taskTitle}</div>
              <div className="tt-kc-meta"><span><FiFolder /> {t.projectName}</span><span><FiUser /> {t.assignedBy}</span></div>
              <div className="tt-kc-footer">
                <TeamTaskPriorityBadge priority={t.priority} />
                <span><FiClock /> {t.deadline}</span>
              </div>
              <TeamTaskProgressBar progress={t.progress} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
export default TeamTaskKanban;