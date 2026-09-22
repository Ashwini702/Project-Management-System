// src/components/teamProjects/TeamProjectTaskList.jsx
import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { projectTasks } from '../../data/teamProjectsData';
import TeamProjectStatusBadge from './TeamProjectStatusBadge';

const TeamProjectTaskList = ({ projectId, onAlert }) => {
  const tasks = projectTasks.filter(t => t.projectId === projectId);
  return (
    <div className="tp-task-list">
      <h6>My Tasks ({tasks.length})</h6>
      {tasks.length === 0 ? <p className="text-muted">No tasks assigned.</p> :
        <div className="table-responsive">
          <table className="table tp-table-sm">
            <thead><tr><th>Task</th><th>Assigned By</th><th>Status</th><th>Priority</th><th>Progress</th><th>Deadline</th><th>Time</th><th>Action</th></tr></thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td>{t.taskTitle}</td><td>{t.assignedBy}</td><td><TeamProjectStatusBadge status={t.status} /></td><td>{t.priority}</td>
                  <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div><small className="ms-1">{t.progress}%</small></td>
                  <td>{t.deadline}</td><td>{t.timeSpent}h/{t.estimatedHours}h</td>
                  <td><button className="action-btn-icon update-btn" onClick={() => onAlert('Open My Tasks page to update.')}><FiEdit3 /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};
export default TeamProjectTaskList;