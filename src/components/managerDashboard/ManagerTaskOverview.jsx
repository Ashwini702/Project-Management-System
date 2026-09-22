// src/components/managerDashboard/ManagerTaskOverview.jsx
import React from 'react';
import { FiEye, FiEdit3, FiCheck } from 'react-icons/fi';
import TaskPriorityBadge from './TaskPriorityBadge';

const ManagerTaskOverview = ({ taskOverview, recentTasks, onMarkComplete, onViewTask, onUpdateTask }) => (
  <div>
    <div className="mgr-task-summary-grid">
      <div className="mgr-ts-card pending"><h4>{taskOverview.pending}</h4><span>Pending</span></div>
      <div className="mgr-ts-card progress"><h4>{taskOverview.inProgress}</h4><span>In Progress</span></div>
      <div className="mgr-ts-card review"><h4>{taskOverview.underReview}</h4><span>Under Review</span></div>
      <div className="mgr-ts-card completed"><h4>{taskOverview.completed}</h4><span>Completed</span></div>
      <div className="mgr-ts-card reopened"><h4>{taskOverview.reopened}</h4><span>Reopened</span></div>
      <div className="mgr-ts-card blocked"><h4>{taskOverview.blocked}</h4><span>Blocked</span></div>
    </div>
    <h6 className="mt-3 mb-2">Recent Tasks</h6>
    <div className="table-responsive">
      <table className="table mgr-table">
        <thead><tr><th>Task</th><th>Project</th><th>Assignee</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>Actions</th></tr></thead>
        <tbody>
          {recentTasks.map(t => (
            <tr key={t.id}>
              <td><span className="mgr-name">{t.title}</span></td><td>{t.project}</td><td>{t.assignedTo}</td><td>{t.deadline}</td>
              <td><TaskPriorityBadge priority={t.priority} /></td>
              <td>{t.status}</td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div><small className="ms-2">{t.progress}%</small></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onViewTask(t)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onUpdateTask(t)}><FiEdit3 /></button>
                {t.status !== 'Completed' && <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(t)}><FiCheck /></button>}
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ManagerTaskOverview;