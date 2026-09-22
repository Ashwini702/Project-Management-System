// src/components/dashboard/ProjectStatusCard.jsx
import React from 'react';

const ProjectStatusCard = ({ projectStatus, total = 0 }) => {
  const getStatusColor = (status) => {
    const colorMap = {
      'Not Started': '#6B7280',
      'In Progress': '#159CEF',
      'On Hold': '#F59E0B',
      'Completed': '#10B981',
      'Cancelled': '#EF4444',
      'Delayed': '#EF4444'
    };
    return colorMap[status] || '#6B7280';
  };

  return (
    <div className="project-status-card">
      <div className="card-header-custom">
        <h5 className="card-title-custom">Project Status Overview</h5>
        <span className="total-projects">Total: {total} Projects</span>
      </div>
      
      <div className="status-list">
        {projectStatus.map((item) => (
          <div key={item.id} className="status-item">
            <div className="status-header">
              <div className="status-label-wrapper">
                <span 
                  className="status-dot"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                ></span>
                <span className="status-label">{item.status}</span>
              </div>
              <span className="status-count">{item.count}</span>
            </div>
            <div className="progress-wrapper">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: getStatusColor(item.status)
                  }}
                  aria-valuenow={item.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="progress-percentage">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatusCard;