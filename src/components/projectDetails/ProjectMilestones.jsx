// src/components/projectDetails/ProjectMilestones.jsx
import React from 'react';
import { FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';

const ProjectMilestones = ({ milestones }) => {
  const getIcon = (status) => {
    if (status === 'Completed') return <FiCheck className="ms-icon completed" />;
    if (status === 'Active') return <FiClock className="ms-icon active" />;
    return <FiAlertCircle className="ms-icon pending" />;
  };

  return (
    <div className="pd-milestones">
      {milestones.map((m, i) => (
        <div key={m.id} className="ms-item">
          <div className="ms-line">
            {getIcon(m.status)}
            {i < milestones.length - 1 && <div className={`ms-connector ${m.status === 'Completed' ? 'completed' : ''}`}></div>}
          </div>
          <div className="ms-content">
            <div className="ms-header">
              <h6>{m.title}</h6>
              <span className={`ms-status-badge ${m.status.toLowerCase()}`}>{m.status}</span>
            </div>
            <p>{m.description}</p>
            <div className="ms-meta"><span>Due: {m.dueDate}</span><span>Assigned: {m.assignedTo}</span></div>
            <div className="progress ms-progress"><div className="progress-bar" style={{ width: `${m.progress}%` }}></div></div>
            <small>{m.progress}%</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectMilestones;