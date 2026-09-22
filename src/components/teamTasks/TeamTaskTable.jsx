// src/components/teamTasks/TeamTaskTable.jsx
import React from 'react';
import { FiEye, FiEdit3, FiEdit2, FiSend, FiCheck } from 'react-icons/fi';
import TeamTaskStatusBadge from './TeamTaskStatusBadge';
import TeamTaskPriorityBadge from './TeamTaskPriorityBadge';

const TeamTaskTable = ({ tasks, onView, onUpdate, onAddNote, onSubmitReview, onMarkComplete }) => (
  <div className="table-responsive">
    <table className="table tt-table">
      <thead><tr><th>Task</th><th>Project</th><th>Assigned By</th><th>Start</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>Time</th><th>Actions</th></tr></thead>
      <tbody>
        {tasks.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No tasks found</p></td></tr> :
          tasks.map(t => (
            <tr key={t.id}>
              <td><span className="tt-name">{t.taskTitle}</span></td><td>{t.projectName}</td><td>{t.assignedBy}</td><td>{t.startDate}</td><td>{t.deadline}</td>
              <td><TeamTaskPriorityBadge priority={t.priority} /></td><td><TeamTaskStatusBadge status={t.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div><small className="ms-2">{t.progress}%</small></td>
              <td>{t.timeSpent}h/{t.estimatedHours}h</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(t)}><FiEye /></button>
                <button className="action-btn-icon update-btn" onClick={() => onUpdate(t)}><FiEdit3 /></button>
                <button className="action-btn-icon note-btn" onClick={() => onAddNote(t)}><FiEdit2 /></button>
                {t.status !== 'Under Review' && t.status !== 'Completed' && <button className="action-btn-icon review-btn" onClick={() => onSubmitReview(t)}><FiSend /></button>}
                {t.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(t)}><FiCheck /></button>}
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default TeamTaskTable;