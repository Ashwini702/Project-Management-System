// src/components/teamProjects/TeamProjectDetailsModal.jsx
import React from 'react';
import { FiX, FiUser, FiFolder, FiCalendar, FiClock } from 'react-icons/fi';
import TeamProjectStatusBadge from './TeamProjectStatusBadge';
import TeamProjectPriorityBadge from './TeamProjectPriorityBadge';
import TeamProjectProgressBar from './TeamProjectProgressBar';
import TeamProjectTaskList from './TeamProjectTaskList';
import TeamProjectTeamMembers from './TeamProjectTeamMembers';
import TeamProjectTimeline from './TeamProjectTimeline';
import TeamProjectFiles from './TeamProjectFiles';

const TeamProjectDetailsModal = ({ show, onClose, project, onAlert }) => {
  if (!show || !project) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-xl"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{project.projectName}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="tp-detail-badges"><TeamProjectPriorityBadge priority={project.priority} /><TeamProjectStatusBadge status={project.status} /></div>
        <p className="mt-3">{project.description}</p>
        <div className="tp-detail-grid">
          <div><FiUser /><strong>Client:</strong> {project.clientName}</div><div><FiFolder /><strong>Category:</strong> {project.category}</div>
          <div><FiUser /><strong>Manager:</strong> {project.managerName} ({project.managerEmail})</div>
          <div><FiCalendar /><strong>Timeline:</strong> {project.startDate} - {project.endDate}</div>
          <div><FiClock /><strong>Deadline:</strong> {project.deadline}</div><div><strong>Phase:</strong> {project.currentPhase}</div>
          <div><strong>My Tasks:</strong> {project.completedTasks}/{project.myAssignedTasks}</div><div><strong>Team:</strong> {project.teamSize} members</div>
        </div>
        <div className="mt-3"><strong>Overall Progress:</strong> {project.overallProgress}% <TeamProjectProgressBar progress={project.overallProgress} /></div>
        <p className="mt-2"><strong>Recent Update:</strong> {project.recentUpdate}</p>
        <div className="mt-4"><TeamProjectTaskList projectId={project.id} onAlert={onAlert} /></div>
        <div className="mt-3"><TeamProjectTeamMembers projectId={project.id} /></div>
        <div className="mt-3"><TeamProjectTimeline projectId={project.id} /></div>
        <div className="mt-3"><TeamProjectFiles projectId={project.id} onAlert={onAlert} /></div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default TeamProjectDetailsModal;