// src/components/projectDetails/ProjectTaskList.jsx
import React from 'react';
import { FiEye, FiEdit2, FiCheck } from 'react-icons/fi';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectPriorityBadge from './ProjectPriorityBadge';

const ProjectTaskList = ({ tasks, onMarkComplete }) => (
  <div className="table-responsive">
    <table className="table pd-table">
      <thead><tr><th>Task</th><th>Assigned To</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>Actions</th></tr></thead>
      <tbody>
        {tasks.map(t => (
          <tr key={t.id}>
            <td><span className="pd-name">{t.name}</span></td><td>{t.assignedTo}</td><td>{t.deadline}</td>
            <td><ProjectPriorityBadge priority={t.priority} /></td><td><ProjectStatusBadge status={t.status} /></td>
            <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div><small className="ms-2">{t.progress}%</small></td>
            <td><div className="action-buttons">
              <button className="action-btn-icon view-btn"><FiEye /></button>
              <button className="action-btn-icon edit-btn"><FiEdit2 /></button>
              {t.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(t.id)}><FiCheck /></button>}
            </div></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProjectTaskList;