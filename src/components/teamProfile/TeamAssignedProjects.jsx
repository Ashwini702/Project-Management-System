// src/components/teamProfile/TeamAssignedProjects.jsx
import React from 'react';
import { FiEye, FiCheckSquare } from 'react-icons/fi';
import TeamStatusBadge from './TeamStatusBadge';
import { assignedProjects } from '../../data/teamProfileData';

const TeamAssignedProjects = ({ onAlert }) => (
  <div className="tprof-projects-grid">
    {assignedProjects.map(p => (
      <div key={p.id} className="tprof-project-card">
        <div className="tprof-proj-header">
          <h6>{p.projectName}</h6>
          <TeamStatusBadge status={p.status} />
        </div>
        <span className="tprof-proj-client">{p.clientName} • {p.projectManager}</span>
        <div className="tprof-proj-progress">
          <span>Project: {p.projectProgress}%</span>
          <div className="progress tprof-progress mb-1"><div className="progress-bar" style={{ width: `${p.projectProgress}%` }}></div></div>
          <span>My Progress: {p.myProgress}%</span>
          <div className="progress tprof-progress mb-1"><div className="progress-bar bg-success" style={{ width: `${p.myProgress}%` }}></div></div>
        </div>
        <div className="tprof-proj-stats">
          <span>Tasks: {p.completedTasks}/{p.assignedTasks}</span>
          <span>Deadline: {p.deadline}</span>
        </div>
        <div className="tprof-proj-actions">
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View Project is demo.')}><FiEye /> View</button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => onAlert('View Tasks is demo.')}><FiCheckSquare /> Tasks</button>
        </div>
      </div>
    ))}
  </div>
);
export default TeamAssignedProjects;