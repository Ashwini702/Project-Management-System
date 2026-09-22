// src/components/teamProjects/TeamProjectTable.jsx
import React from 'react';
import { FiEye, FiCheckSquare, FiFileText, FiEdit3 } from 'react-icons/fi';
import TeamProjectStatusBadge from './TeamProjectStatusBadge';
import TeamProjectPriorityBadge from './TeamProjectPriorityBadge';

const TeamProjectTable = ({ projects, onView, onTasks, onFiles, onUpdate }) => (
  <div className="table-responsive">
    <table className="table tp-table">
      <thead><tr><th>Project</th><th>Client</th><th>Category</th><th>Manager</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>My Tasks</th><th>Phase</th><th>Actions</th></tr></thead>
      <tbody>
        {projects.length === 0 ? <tr><td colSpan="11" className="text-center py-5"><p className="text-muted">No projects found</p></td></tr> :
          projects.map(p => (
            <tr key={p.id}>
              <td><span className="tp-name">{p.projectName}</span></td><td>{p.clientName}</td><td>{p.category}</td><td>{p.managerName}</td>
              <td>{p.deadline}</td><td><TeamProjectPriorityBadge priority={p.priority} /></td><td><TeamProjectStatusBadge status={p.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${p.overallProgress}%` }}></div></div><small className="ms-2">{p.overallProgress}%</small></td>
              <td>{p.completedTasks}/{p.myAssignedTasks}</td><td>{p.currentPhase}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(p)}><FiEye /></button>
                <button className="action-btn-icon task-btn" onClick={() => onTasks(p)}><FiCheckSquare /></button>
                <button className="action-btn-icon file-btn" onClick={() => onFiles(p)}><FiFileText /></button>
                <button className="action-btn-icon update-btn" onClick={() => onUpdate(p)}><FiEdit3 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default TeamProjectTable;