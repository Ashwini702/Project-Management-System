// src/components/projects/ProjectStatsCard.jsx
import React from 'react';
import { 
  FiFolder, FiTrendingUp, FiClock, FiCheckCircle, 
  FiAlertTriangle, FiPauseCircle 
} from 'react-icons/fi';

const iconMap = {
  FiFolder, FiTrendingUp, FiClock, FiCheckCircle, FiAlertTriangle, FiPauseCircle
};

const ProjectStatsCard = ({ stat }) => {
  const getColorClass = (color) => {
    const colorMap = {
      primary: 'proj-stat-primary',
      info: 'proj-stat-info',
      warning: 'proj-stat-warning',
      success: 'proj-stat-success',
      danger: 'proj-stat-danger',
      purple: 'proj-stat-purple'
    };
    return colorMap[color] || 'proj-stat-primary';
  };

  const Icon = iconMap[stat.icon];

  return (
    <div className={`project-stat-card ${getColorClass(stat.color)}`}>
      <div className="project-stat-content">
        <div className="project-stat-icon-wrapper">
          <Icon className="project-stat-icon" />
        </div>
        <div className="project-stat-info">
          <h3 className="project-stat-value">{stat.value}</h3>
          <p className="project-stat-title">{stat.title}</p>
          <span className="project-stat-desc">{stat.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsCard;