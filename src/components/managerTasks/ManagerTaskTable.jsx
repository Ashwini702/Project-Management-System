// src/components/managerTasks/ManagerTaskTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiEdit3, FiCheck, FiTrash2 } from 'react-icons/fi';
import ManagerTaskStatusBadge from './ManagerTaskStatusBadge';
import ManagerTaskPriorityBadge from './ManagerTaskPriorityBadge';

const ManagerTaskTable = ({ tasks, onView, onEdit, onUpdateStatus, onMarkComplete, onDelete }) => (
  <div className="table-responsive">
    <table className="table mt-table">
      <thead><tr><th>Task</th><th>Project</th><th>Assignee</th><th>Start</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>Time</th><th>Actions</th></tr></thead>
      <tbody>
        {tasks.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No tasks found</p></td></tr> :
          tasks.map(t => (
            <tr key={t.id}>
              <td><span className="mt-name">{t.title}</span></td><td>{t.project}</td><td>{t.assignee}</td>
              <td>{t.startDate}</td><td>{t.deadline}</td>
              <td><ManagerTaskPriorityBadge priority={t.priority} /></td><td><ManagerTaskStatusBadge status={t.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div><small className="ms-2">{t.progress}%</small></td>
              <td>{t.timeSpent}h/{t.estimatedHours}h</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(t)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(t)}><FiEdit2 /></button>
                <button className="action-btn-icon status-btn" onClick={() => onUpdateStatus(t)}><FiEdit3 /></button>
                {t.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(t)}><FiCheck /></button>}
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(t)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default ManagerTaskTable;