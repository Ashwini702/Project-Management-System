// src/components/teamProjects/TeamProjectTimeline.jsx
import React from 'react';
import { FiCheck, FiClock, FiAlertCircle } from 'react-icons/fi';
import { projectTimeline } from '../../data/teamProjectsData';

const TeamProjectTimeline = ({ projectId }) => {
  const items = projectTimeline.filter(t => t.projectId === projectId);
  const getIcon = (status) => {
    if (status === 'Completed') return <FiCheck className="tp-tl-icon-done" />;
    if (status === 'Active') return <FiClock className="tp-tl-icon-active" />;
    if (status === 'Delayed') return <FiAlertCircle className="tp-tl-icon-delayed" />;
    return <FiClock className="tp-tl-icon-pending" />;
  };

  return (
    <div className="tp-timeline">
      <h6>Project Timeline</h6>
      {items.map((t, i) => (
        <div key={t.id} className="tp-tl-item">
          <div className="tp-tl-marker">{getIcon(t.status)}</div>
          {i < items.length - 1 && <div className={`tp-tl-line ${t.status === 'Completed' ? 'done' : ''}`}></div>}
          <div className="tp-tl-content">
            <strong>{t.title}</strong>
            <span>{t.date} • {t.responsiblePerson}</span>
            <p>{t.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TeamProjectTimeline;