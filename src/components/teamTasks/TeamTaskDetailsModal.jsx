// src/components/teamTasks/TeamTaskDetailsModal.jsx
import React from 'react';
import { FiX, FiFolder, FiUser, FiClock, FiList, FiMessageSquare } from 'react-icons/fi';
import TeamTaskStatusBadge from './TeamTaskStatusBadge';
import TeamTaskPriorityBadge from './TeamTaskPriorityBadge';
import TeamTaskProgressBar from './TeamTaskProgressBar';
import TeamTaskChecklist from './TeamTaskChecklist';
import TeamTaskDiscussion from './TeamTaskDiscussion';

const TeamTaskDetailsModal = ({ show, onClose, task, onAlert }) => {
  if (!show || !task) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{task.taskTitle}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="tt-detail-badges"><TeamTaskPriorityBadge priority={task.priority} /><TeamTaskStatusBadge status={task.status} /></div>
        <p className="mt-3">{task.description}</p>
        <div className="tt-detail-grid">
          <div><FiFolder /><strong>Project:</strong> {task.projectName}</div><div><FiUser /><strong>Assigned By:</strong> {task.assignedBy}</div>
          <div><FiClock /><strong>Start:</strong> {task.startDate}</div><div><FiClock /><strong>Deadline:</strong> {task.deadline}</div>
          <div><strong>Time:</strong> {task.timeSpent}h / {task.estimatedHours}h</div><div><strong>Updated:</strong> {task.lastUpdated}</div>
        </div>
        <div className="mt-3"><TeamTaskProgressBar progress={task.progress} /></div>
        <div className="mt-4"><TeamTaskChecklist taskId={task.id} /></div>
        <div className="mt-4"><TeamTaskDiscussion taskId={task.id} onAlert={onAlert} /></div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default TeamTaskDetailsModal;