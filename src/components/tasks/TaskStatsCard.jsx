// src/components/tasks/TaskStatsCard.jsx
import React from 'react';
import { FiCheckSquare, FiClock, FiTrendingUp, FiEye, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

const iconMap = {
  FiCheckSquare, FiClock, FiTrendingUp, FiEye, FiCheckCircle, FiRefreshCw
};

const TaskStatsCard = ({ stat }) => {
  const getColorClass = (color) => {
    const colorMap = {
      primary: 'task-stat-primary',
      warning: 'task-stat-warning',
      info: 'task-stat-info',
      purple: 'task-stat-purple',
      success: 'task-stat-success',
      danger: 'task-stat-danger'
    };
    return colorMap[color] || 'task-stat-primary';
  };

  const Icon = iconMap[stat.icon];

  return (
    <div className={`task-stat-card ${getColorClass(stat.color)}`}>
      <div className="task-stat-content">
        <div className="task-stat-icon-wrapper">
          <Icon className="task-stat-icon" />
        </div>
        <div className="task-stat-info">
          <h3 className="task-stat-value">{stat.value}</h3>
          <p className="task-stat-title">{stat.title}</p>
          <span className="task-stat-desc">{stat.description}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskStatsCard;