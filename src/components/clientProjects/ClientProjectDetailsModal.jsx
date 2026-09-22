// src/components/clientProjects/ClientProjectDetailsModal.jsx
import React from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiFolder, FiCalendar } from 'react-icons/fi';
import ClientProjectStatusBadge from './ClientProjectStatusBadge';
import ClientProjectPriorityBadge from './ClientProjectPriorityBadge';
import ClientProjectProgressBox from './ClientProjectProgressBox';
import ClientProjectTaskSummary from './ClientProjectTaskSummary';

const ClientProjectDetailsModal = ({ show, onClose, project }) => {
  if (!show || !project) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{project.projectName}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="clp-detail-badges"><ClientProjectPriorityBadge priority={project.priority} /><ClientProjectStatusBadge status={project.status} /></div>
        <p className="mt-3">{project.description}</p>
        <div className="clp-detail-grid">
          <div><FiFolder /><strong>Category:</strong> {project.category}</div>
          <div><FiUser /><strong>Manager:</strong> {project.managerName}</div>
          <div><FiMail /><strong>Email:</strong> {project.managerEmail}</div>
          <div><FiPhone /><strong>Phone:</strong> {project.managerPhone}</div>
          <div><FiCalendar /><strong>Timeline:</strong> {project.startDate} - {project.endDate}</div>
          <div><strong>Deadline:</strong> {project.deadline}</div>
          <div><strong>Phase:</strong> {project.currentPhase}</div>
          <div><strong>Tasks:</strong> {project.completedTasks}/{project.totalTasks}</div>
        </div>
        <div className="progress mt-3"><div className="progress-bar" style={{ width: `${project.progress}%` }}></div></div>
        <p className="mt-3"><strong>Recent Update:</strong> {project.recentUpdate}</p>
        <div className="mt-4"><ClientProjectProgressBox projectName={project.projectName} /></div>
        <div className="mt-3"><ClientProjectTaskSummary projectId={project.id} /></div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default ClientProjectDetailsModal;