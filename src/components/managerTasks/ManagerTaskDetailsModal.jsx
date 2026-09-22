// src/components/managerTasks/ManagerTaskDetailsModal.jsx
import React from 'react';
import { FiX, FiFolder, FiUser, FiCalendar, FiClock, FiFlag } from 'react-icons/fi';
import ManagerTaskStatusBadge from './ManagerTaskStatusBadge';
import ManagerTaskPriorityBadge from './ManagerTaskPriorityBadge';
import ManagerTaskChecklist from './ManagerTaskChecklist';
import ManagerTaskDiscussion from './ManagerTaskDiscussion';

const ManagerTaskDetailsModal = ({ show, onClose, task, onAlert }) => {
  if (!show || !task) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{task.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="mt-detail-badges"><ManagerTaskPriorityBadge priority={task.priority} /><ManagerTaskStatusBadge status={task.status} /></div>
        <p className="mt-3">{task.description}</p>
        <div className="mt-detail-grid">
          <div><FiFolder /><strong>Project:</strong> {task.project}</div><div><FiUser /><strong>Assignee:</strong> {task.assignee}</div>
          <div><FiCalendar /><strong>Start:</strong> {task.startDate}</div><div><FiCalendar /><strong>Deadline:</strong> {task.deadline}</div>
          <div><FiClock /><strong>Time:</strong> {task.timeSpent}h / {task.estimatedHours}h</div>
          <div><FiFlag /><strong>Assigned By:</strong> {task.assignedBy}</div>
        </div>
        <div className="progress mt-3"><div className="progress-bar" style={{ width: `${task.progress}%` }}></div></div>
        <div className="mt-4"><ManagerTaskChecklist /></div>
        <div className="mt-4"><ManagerTaskDiscussion onAlert={onAlert} /></div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};

export default ManagerTaskDetailsModal;