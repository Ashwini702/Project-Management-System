// src/components/dashboard/TaskProgress.jsx
import React from 'react';

const TaskProgress = ({ taskData }) => {
  const getColorClass = (color) => {
    const colorMap = {
      warning: '#F59E0B',
      primary: '#159CEF',
      info: '#3AACF1',
      success: '#10B981',
      danger: '#EF4444'
    };
    return colorMap[color] || '#159CEF';
  };

  return (
    <div className="task-progress-card">
      <div className="card-header-custom">
        <h5 className="card-title-custom">Task Progress Summary</h5>
        <span className="total-tasks">Total: {taskData.total} Tasks</span>
      </div>

      <div className="task-categories">
        {taskData.categories.map((category) => (
          <div key={category.id} className="task-category-item">
            <div className="category-header">
              <div className="category-info">
                <span 
                  className="category-dot"
                  style={{ backgroundColor: getColorClass(category.color) }}
                ></span>
                <span className="category-label">{category.label}</span>
              </div>
              <span className="category-count">{category.count}</span>
            </div>
            <div className="progress-wrapper">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: getColorClass(category.color)
                  }}
                  aria-valuenow={category.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="progress-percentage">{category.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskProgress;