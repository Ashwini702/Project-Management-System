// src/components/tasks/TaskProgressBar.jsx
import React from 'react';

const TaskProgressBar = ({ progress }) => {
  const getProgressColor = (progress) => {
    if (progress >= 100) return 'var(--success-color)';
    if (progress >= 70) return 'var(--primary-color)';
    if (progress >= 40) return 'var(--secondary-color)';
    if (progress >= 20) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  return (
    <div className="task-progress-wrapper">
      <div className="progress task-progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ 
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress)
          }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span className="task-progress-text">{progress}%</span>
    </div>
  );
};

export default TaskProgressBar;