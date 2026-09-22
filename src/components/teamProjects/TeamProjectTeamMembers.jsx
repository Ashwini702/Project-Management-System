// src/components/teamProjects/TeamProjectTeamMembers.jsx
import React from 'react';
import { teamMembers } from '../../data/teamProjectsData';

const TeamProjectTeamMembers = ({ projectId }) => {
  const members = teamMembers.filter(m => m.projectId === projectId);
  return (
    <div className="tp-team-members">
      <h6>Team Members ({members.length})</h6>
      <div className="tp-team-grid">
        {members.map(m => (
          <div key={m.id} className="tp-team-card">
            <div className="tp-team-avatar">{m.memberName.split(' ').map(n => n[0]).join('')}</div>
            <div className="tp-team-info">
              <strong>{m.memberName}</strong>
              <span>{m.role} • {m.department}</span>
              <span className={`tp-avail tp-avail-${m.availabilityStatus?.toLowerCase().replace(' ', '-')}`}>{m.availabilityStatus}</span>
            </div>
            <div className="tp-team-tasks">Tasks: {m.completedTasks}/{m.assignedTasks}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeamProjectTeamMembers;