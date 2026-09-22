// src/components/team/TeamMemberTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import MemberStatusBadge from './MemberStatusBadge';
import DepartmentBadge from './DepartmentBadge';

const TeamMemberTable = ({ members, onView, onEdit, onDelete, onAssign }) => {
  const getWorkloadColor = (wl) => {
    if (wl >= 90) return 'var(--danger-color)';
    if (wl >= 70) return 'var(--warning-color)';
    if (wl >= 40) return 'var(--primary-color)';
    return 'var(--success-color)';
  };

  return (
    <div className="table-responsive">
      <table className="table team-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Department</th>
            <th>Projects</th>
            <th>Tasks</th>
            <th>Workload</th>
            <th>Performance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr><td colSpan="11" className="text-center py-5"><p className="text-muted mb-0">No members found</p></td></tr>
          ) : (
            members.map(member => (
              <tr key={member.id}>
                <td>
                  <div className="member-cell">
                    <div className="member-avatar-sm">{member.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <span className="member-name-text">{member.name}</span>
                      <small className="d-block text-muted">{member.role}</small>
                    </div>
                  </div>
                </td>
                <td><span className="member-email-sm">{member.email}</span></td>
                <td>{member.phone}</td>
                <td>{member.role}</td>
                <td><DepartmentBadge department={member.department} /></td>
                <td><span className="project-count">{member.assignedProjects.length}</span></td>
                <td>{member.completedTasks}/{member.assignedTasks}</td>
                <td>
                  <div className="mini-progress-wrapper">
                    <div className="progress mini-progress">
                      <div className="progress-bar" style={{ width: `${member.workload}%`, backgroundColor: getWorkloadColor(member.workload) }}></div>
                    </div>
                    <span className="mini-progress-text">{member.workload}%</span>
                  </div>
                </td>
                <td>
                  <span className={`performance-text ${member.performance >= 90 ? 'excellent' : member.performance >= 75 ? 'good' : 'average'}`}>
                    {member.performance}%
                  </span>
                </td>
                <td><MemberStatusBadge status={member.status} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn-icon view-btn" onClick={() => onView(member)} title="View"><FiEye /></button>
                    <button className="action-btn-icon edit-btn" onClick={() => onEdit(member)} title="Edit"><FiEdit2 /></button>
                    <button className="action-btn-icon assign-btn" onClick={() => onAssign(member)} title="Assign Project"><FiUserPlus /></button>
                    <button className="action-btn-icon delete-btn" onClick={() => onDelete(member)} title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMemberTable;