// src/components/team/TeamMemberCard.jsx
import React from 'react';
import {
  FiFolder,
  FiCheckSquare,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUserPlus
} from 'react-icons/fi';
import MemberStatusBadge from './MemberStatusBadge';

const TeamMemberCard = ({ member, onView, onEdit, onDelete, onAssign }) => {
  const getWorkloadColor = (wl) => {
    if (wl >= 90) return 'var(--danger-color)';
    if (wl >= 70) return 'var(--warning-color)';
    if (wl >= 40) return 'var(--primary-color)';
    return 'var(--success-color)';
  };

  const getWorkloadLabel = (wl) => {
    if (wl >= 90) return 'Overloaded';
    if (wl >= 70) return 'High';
    if (wl >= 40) return 'Medium';
    return 'Low';
  };

  const doneTasks = member.completedTasks || 0;
  const pendingTasks = member.pendingTasks || 0;
  const overdueTasks = member.overdueTasks || 0;
  const activeProject = member.assignedProjects?.[0] || 'Not Assigned';

  return (
    <div className={`team-member-card ${member.workload >= 90 ? 'overloaded' : ''}`}>
      <div className="member-card-header">
        <div className="member-card-main">
          <div className="member-avatar-lg">
            {member.name.split(' ').map((n) => n[0]).join('')}
          </div>

          <div className="member-card-info">
            <h5 className="member-name">{member.name}</h5>
            <p className="member-role">{member.role}</p>
            <span className="member-department-text">{member.department}</span>
          </div>
        </div>

        <div className="team-card-top-actions">
          <button className="member-action-btn icon-only" onClick={() => onView(member)} title="View">
            <FiEye />
          </button>
          <button className="member-action-btn icon-only" onClick={() => onEdit(member)} title="Edit">
            <FiEdit2 />
          </button>
          <button className="member-action-btn icon-only" onClick={() => onAssign(member)} title="Assign Project">
            <FiUserPlus />
          </button>
          <button className="member-action-btn icon-only danger" onClick={() => onDelete(member)} title="Delete">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <MemberStatusBadge status={member.status} />

      <div className="member-skills">
        {member.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
        {member.skills.length > 3 && (
          <span className="skill-tag more">+{member.skills.length - 3}</span>
        )}
      </div>

      <div className="member-stats-row">
        <div className="member-stat-item">
          <FiFolder />
          <span>{member.assignedProjects.length} Projects</span>
        </div>
        <div className="member-stat-item">
          <FiCheckSquare />
          <span>{doneTasks}/{member.assignedTasks} Tasks</span>
        </div>
      </div>

      <div className="member-task-summary">
        <span className="task-done">{doneTasks} Done</span>
        <span className="task-pending">{pendingTasks} Pending</span>
        {overdueTasks > 0 && <span className="task-overdue">{overdueTasks} Overdue</span>}
      </div>

      <div className="member-progress-section">
        <div className="progress-label">
          <span>Workload</span>
          <span style={{ color: getWorkloadColor(member.workload) }}>
            {member.workload}% ({getWorkloadLabel(member.workload)})
          </span>
        </div>
        <div className="progress member-progress">
          <div
            className="progress-bar"
            style={{
              width: `${member.workload}%`,
              backgroundColor: getWorkloadColor(member.workload)
            }}
          ></div>
        </div>
      </div>

      <div className="member-card-perf">
        <span>Performance: <strong>{member.performance}%</strong></span>
        <span>Active: {activeProject}</span>
      </div>
    </div>
  );
};

export default TeamMemberCard;