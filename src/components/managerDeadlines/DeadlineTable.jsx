// src/components/managerDeadlines/DeadlineTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiCheck, FiBell, FiTrash2 } from 'react-icons/fi';
import DeadlineStatusBadge from './DeadlineStatusBadge';
import DeadlinePriorityBadge from './DeadlinePriorityBadge';

const DeadlineTable = ({ deadlines, onView, onEdit, onMarkComplete, onSendReminder, onDelete }) => (
  <div className="table-responsive">
    <table className="table mdl-table">
      <thead><tr><th>Title</th><th>Type</th><th>Project</th><th>Task</th><th>Assignee</th><th>Due Date</th><th>Days</th><th>Priority</th><th>Status</th><th>Progress</th><th>Actions</th></tr></thead>
      <tbody>
        {deadlines.length === 0 ? <tr><td colSpan="11" className="text-center py-5"><p className="text-muted">No deadlines found</p></td></tr> :
          deadlines.map(d => (
            <tr key={d.id} className={d.status === 'Overdue' ? 'row-overdue' : ''}>
              <td><span className="mdl-name">{d.title}</span></td>
              <td><span className="mdl-type-tag">{d.type}</span></td>
              <td>{d.project}</td><td>{d.relatedTask || '-'}</td><td>{d.assignee}</td>
              <td>{d.dueDate}</td>
              <td><span className={d.daysRemaining < 0 ? 'text-danger fw-bold' : d.daysRemaining <= 1 ? 'text-warning fw-bold' : ''}>{d.daysRemaining < 0 ? `${Math.abs(d.daysRemaining)}d over` : `${d.daysRemaining}d`}</span></td>
              <td><DeadlinePriorityBadge priority={d.priority} /></td><td><DeadlineStatusBadge status={d.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${d.progress}%` }}></div></div><small className="ms-2">{d.progress}%</small></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(d)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(d)}><FiEdit2 /></button>
                {d.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(d)}><FiCheck /></button>}
                <button className="action-btn-icon bell-btn" onClick={() => onSendReminder(d)}><FiBell /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(d)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default DeadlineTable;