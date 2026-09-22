// src/components/clientProjects/ClientProjectTaskSummary.jsx
import React from 'react';
import { projectTasks } from '../../data/clientProjectsData';

const ClientProjectTaskSummary = ({ projectId }) => {
  const tasks = projectTasks.filter(t => t.projectId === projectId);

  return (
    <div className="clp-task-summary">
      <h6>Task Summary ({tasks.length})</h6>
      <div className="clp-task-stats">
        <span className="text-success">{tasks.filter(t => t.status === 'Completed').length} Done</span>
        <span className="text-primary">{tasks.filter(t => t.status === 'In Progress').length} Active</span>
        <span className="text-warning">{tasks.filter(t => t.status === 'Pending').length} Pending</span>
      </div>
      {tasks.map(t => (
        <div key={t.id} className="clp-task-item">
          <span>{t.taskName}</span>
          <span>{t.assignedTo}</span>
          <span className={`clp-task-status ${t.status.toLowerCase().replace(' ', '-')}`}>{t.status}</span>
          <div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div>
          <small>{t.progress}%</small>
        </div>
      ))}
    </div>
  );
};
export default ClientProjectTaskSummary;