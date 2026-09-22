// src/components/projectDetails/ProjectActivityTimeline.jsx
import React from 'react';
import { FiPlus, FiUsers, FiEdit3, FiCheck, FiMessageSquare } from 'react-icons/fi';

const iconMap = { create: FiPlus, team: FiUsers, update: FiEdit3, complete: FiCheck, feedback: FiMessageSquare };

const ProjectActivityTimeline = ({ activities }) => (
  <div className="pd-timeline">
    {activities.map((a, i) => {
      const Icon = iconMap[a.type] || FiEdit3;
      return (
        <div key={a.id} className="pd-tl-item">
          <div className="pd-tl-icon"><Icon /></div>
          {i < activities.length - 1 && <div className="pd-tl-line"></div>}
          <div className="pd-tl-content">
            <h6>{a.title}</h6>
            <p>{a.description}</p>
            <span>{a.user} • {a.dateTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default ProjectActivityTimeline;