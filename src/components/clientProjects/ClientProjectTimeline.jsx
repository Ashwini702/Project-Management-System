// src/components/clientProjects/ClientProjectTimeline.jsx
import React from 'react';
import { FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';
import { projectTimelines } from '../../data/clientProjectsData';

const ClientProjectTimeline = ({ projectId }) => {
  const items = projectTimelines.filter(t => t.projectId === projectId);

  const getIcon = (status) => {
    if (status === 'Completed') return <FiCheck className="clp-tl-icon-done" />;
    if (status === 'Active') return <FiClock className="clp-tl-icon-active" />;
    return <FiAlertCircle className="clp-tl-icon-pending" />;
  };

  return (
    <div className="clp-timeline">
      <h6>Project Timeline</h6>
      {items.map((t, i) => (
        <div key={t.id} className="clp-tl-item">
          <div className="clp-tl-marker">{getIcon(t.status)}</div>
          {i < items.length - 1 && <div className={`clp-tl-line ${t.status === 'Completed' ? 'done' : ''}`}></div>}
          <div className="clp-tl-content">
            <strong>{t.title}</strong>
            <span>{t.date}</span>
            <p>{t.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ClientProjectTimeline;