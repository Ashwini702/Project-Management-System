// src/components/projects/ProjectTimeline.jsx
import React from 'react';
import { FiCheck, FiCircle, FiClock } from 'react-icons/fi';

const ProjectTimeline = ({ timeline }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <FiCheck />;
      case 'Active': return <FiClock />;
      case 'Delayed': return <FiClock className="delayed" />;
      default: return <FiCircle />;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'tl-completed';
      case 'Active': return 'tl-active';
      case 'Delayed': return 'tl-delayed';
      default: return 'tl-pending';
    }
  };

  return (
    <div className="project-timeline">
      {timeline.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className={`timeline-icon ${getStatusClass(item.status)}`}>
            {getStatusIcon(item.status)}
          </div>
          <div className="timeline-content">
            <h6 className="timeline-title">{item.title}</h6>
            <span className="timeline-date">{item.date}</span>
            <span className={`timeline-status ${getStatusClass(item.status)}`}>
              {item.status}
            </span>
          </div>
          {index < timeline.length - 1 && (
            <div className={`timeline-connector ${getStatusClass(item.status)}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectTimeline;