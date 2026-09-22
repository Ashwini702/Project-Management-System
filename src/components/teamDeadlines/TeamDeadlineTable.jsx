// src/components/teamDeadlines/TeamDeadlineTable.jsx
import React from 'react';
import { FiEye, FiBell, FiCheck, FiEdit2 } from 'react-icons/fi';
import TeamDeadlineStatusBadge from './TeamDeadlineStatusBadge';
import TeamDeadlinePriorityBadge from './TeamDeadlinePriorityBadge';

const TeamDeadlineTable = ({ deadlines, onView, onReminder, onMarkComplete, onAddNote }) => (
  <div className="table-responsive">
    <table className="table td-table">
      <thead><tr><th>Deadline</th><th>Type</th><th>Project</th><th>Task</th><th>Due Date</th><th>Days</th><th>Priority</th><th>Status</th><th>Progress</th><th>Actions</th></tr></thead>
      <tbody>
        {deadlines.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No deadlines found</p></td></tr> :
          deadlines.map(d => (
            <tr key={d.id} className={d.status === 'Overdue' ? 'row-overdue' : ''}>
              <td><div><span className="td-name">{d.title}</span><small className="d-block text-muted">{d.description?.substring(0, 40)}...</small></div></td>
              <td><span className="td-type-tag">{d.type}</span></td><td>{d.projectName}</td><td>{d.relatedTask || '-'}</td>
              <td>{d.dueDate} {d.dueTime}</td>
              <td><span className={d.daysRemaining < 0 ? 'text-danger fw-bold' : d.daysRemaining <= 1 ? 'text-warning fw-bold' : ''}>{d.daysRemaining < 0 ? `${Math.abs(d.daysRemaining)}d over` : `${d.daysRemaining}d`}</span></td>
              <td><TeamDeadlinePriorityBadge priority={d.priority} /></td><td><TeamDeadlineStatusBadge status={d.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${d.progress}%` }}></div></div><small className="ms-2">{d.progress}%</small></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(d)}><FiEye /></button>
                <button className="action-btn-icon bell-btn" onClick={() => onReminder(d)}><FiBell /></button>
                {d.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(d)}><FiCheck /></button>}
                <button className="action-btn-icon note-btn" onClick={() => onAddNote(d)}><FiEdit2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default TeamDeadlineTable;