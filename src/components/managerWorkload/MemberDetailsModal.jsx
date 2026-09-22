// src/components/managerWorkload/MemberDetailsModal.jsx
import React from 'react';
import { FiX, FiMail, FiPhone, FiFolder, FiCheckSquare, FiActivity } from 'react-icons/fi';
import AvailabilityStatusBadge from './AvailabilityStatusBadge';
import WorkloadProgressBar from './WorkloadProgressBar';

const MemberDetailsModal = ({ show, onClose, member }) => {
  if (!show || !member) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{member.name}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="mwl-detail-header">
          <div className="mwl-detail-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <h4>{member.name}</h4><span>{member.role}</span><span className="ms-2">{member.department}</span>
            <div className="mt-1"><AvailabilityStatusBadge status={member.availability} /></div>
          </div>
        </div>
        <div className="mwl-detail-grid mt-3">
          <div><FiMail /> {member.email}</div><div><FiPhone /> {member.phone}</div>
          <div><FiFolder /> Projects: {member.assignedProjects.join(', ')}</div>
          <div><FiCheckSquare /> Tasks: {member.completedTasks}/{member.assignedTasks} | Pending: {member.pendingTasks} | Overdue: {member.overdueTasks}</div>
          <div><FiActivity /> Active: {member.activeProject}</div>
        </div>
        <div className="mt-3"><WorkloadProgressBar workload={member.workload} /></div>
        <div className="mt-2"><strong>Performance:</strong> {member.performance}%</div>
        <div className="mt-2"><strong>Skills:</strong> {member.skills.join(', ')}</div>
        <div className="mt-3"><strong>Recent Tasks:</strong> {member.recentTasks.join(', ')}</div>
        <div className="mt-1"><strong>Recent Activity:</strong> {member.recentActivity}</div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default MemberDetailsModal;