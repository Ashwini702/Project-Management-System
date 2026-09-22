// src/components/managerWorkload/TeamMemberWorkloadCard.jsx
import React from 'react';
import { FiEye, FiRefreshCw, FiList, FiFolder, FiCheckSquare } from 'react-icons/fi';
import AvailabilityStatusBadge from './AvailabilityStatusBadge';
import WorkloadProgressBar from './WorkloadProgressBar';

const TeamMemberWorkloadCard = ({ member, onView, onReassign, onViewTasks }) => (
  <div className={`mwl-member-card ${member.availability === 'Overloaded' ? 'overloaded' : ''}`}>
    <div className="mwl-card-header">
      <div className="mwl-card-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
      <div className="mwl-card-info">
        <h6>{member.name}</h6>
        <span>{member.role}</span>
        <span className="mwl-card-dept">{member.department}</span>
      </div>
      <AvailabilityStatusBadge status={member.availability} />
    </div>
    <div className="mwl-card-skills">
      {member.skills.slice(0, 3).map(s => <span key={s} className="mwl-skill-tag">{s}</span>)}
      {member.skills.length > 3 && <span className="mwl-skill-tag more">+{member.skills.length - 3}</span>}
    </div>
    <div className="mwl-card-stats">
      <span><FiFolder /> {member.assignedProjects.length} Projects</span>
      <span><FiCheckSquare /> {member.completedTasks}/{member.assignedTasks} Tasks</span>
    </div>
    <div className="mwl-card-task-detail">
      <span className="text-success">{member.completedTasks} Done</span>
      <span className="text-warning">{member.pendingTasks} Pending</span>
      {member.overdueTasks > 0 && <span className="text-danger">{member.overdueTasks} Overdue</span>}
    </div>
    <WorkloadProgressBar workload={member.workload} />
    <div className="mwl-card-perf">
      <span>Performance: <strong>{member.performance}%</strong></span>
      <span>Active: {member.activeProject}</span>
    </div>
    <div className="mwl-card-actions">
      <button className="mwl-btn" onClick={() => onView(member)}><FiEye /> Details</button>
      <button className="mwl-btn" onClick={() => onReassign(member)}><FiRefreshCw /> Reassign</button>
      <button className="mwl-btn" onClick={() => onViewTasks(member)}><FiList /> Tasks</button>
    </div>
  </div>
);
export default TeamMemberWorkloadCard;