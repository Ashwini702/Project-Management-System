// src/components/managerWorkload/TeamWorkloadTable.jsx
import React from 'react';
import { FiEye, FiRefreshCw, FiList } from 'react-icons/fi';
import AvailabilityStatusBadge from './AvailabilityStatusBadge';

const TeamWorkloadTable = ({ members, onView, onReassign, onViewTasks }) => (
  <div className="table-responsive">
    <table className="table mwl-table">
      <thead><tr><th>Member</th><th>Role</th><th>Department</th><th>Active Project</th><th>Tasks</th><th>Done</th><th>Pending</th><th>Overdue</th><th>Workload</th><th>Perf</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {members.length === 0 ? <tr><td colSpan="12" className="text-center py-5"><p className="text-muted">No members found</p></td></tr> :
          members.map(m => (
            <tr key={m.id} className={m.availability === 'Overloaded' ? 'row-overloaded' : ''}>
              <td>
                <div className="mwl-cell">
                  <div className="mwl-cell-avatar">{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><span className="mwl-cell-name">{m.name}</span><small className="d-block text-muted">{m.email}</small></div>
                </div>
              </td>
              <td>{m.role}</td><td>{m.department}</td><td>{m.activeProject}</td>
              <td>{m.assignedTasks}</td><td className="text-success">{m.completedTasks}</td>
              <td className="text-warning">{m.pendingTasks}</td>
              <td className="text-danger">{m.overdueTasks}</td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${m.workload}%`, backgroundColor: m.workload >= 90 ? 'var(--danger-color)' : m.workload >= 70 ? 'var(--warning-color)' : 'var(--primary-color)' }}></div></div><small className="ms-1">{m.workload}%</small></td>
              <td><strong>{m.performance}%</strong></td>
              <td><AvailabilityStatusBadge status={m.availability} /></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(m)}><FiEye /></button>
                <button className="action-btn-icon reassign-btn" onClick={() => onReassign(m)}><FiRefreshCw /></button>
                <button className="action-btn-icon tasks-btn" onClick={() => onViewTasks(m)}><FiList /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default TeamWorkloadTable;