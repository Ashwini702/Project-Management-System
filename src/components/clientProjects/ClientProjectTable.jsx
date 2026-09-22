// src/components/clientProjects/ClientProjectTable.jsx
import React from 'react';
import { FiEye, FiFileText, FiMessageSquare, FiSend } from 'react-icons/fi';
import ClientProjectStatusBadge from './ClientProjectStatusBadge';
import ClientProjectPriorityBadge from './ClientProjectPriorityBadge';

const ClientProjectTable = ({ projects, onView, onFiles, onFeedback, onMessage }) => (
  <div className="table-responsive">
    <table className="table clp-table">
      <thead><tr><th>Project</th><th>Category</th><th>Manager</th><th>Start</th><th>End</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>Phase</th><th>Actions</th></tr></thead>
      <tbody>
        {projects.length === 0 ? <tr><td colSpan="11" className="text-center py-5"><p className="text-muted">No projects found</p></td></tr> :
          projects.map(p => (
            <tr key={p.id}>
              <td><span className="clp-name">{p.projectName}</span></td><td>{p.category}</td><td>{p.managerName}</td>
              <td>{p.startDate}</td><td>{p.endDate}</td><td>{p.deadline}</td>
              <td><ClientProjectPriorityBadge priority={p.priority} /></td><td><ClientProjectStatusBadge status={p.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${p.progress}%` }}></div></div><small className="ms-2">{p.progress}%</small></td>
              <td>{p.currentPhase}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(p)}><FiEye /></button>
                <button className="action-btn-icon file-btn" onClick={() => onFiles(p)}><FiFileText /></button>
                <button className="action-btn-icon fb-btn" onClick={() => onFeedback(p)}><FiMessageSquare /></button>
                <button className="action-btn-icon msg-btn" onClick={() => onMessage(p)}><FiSend /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default ClientProjectTable;