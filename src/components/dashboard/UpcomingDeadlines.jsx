// src/components/dashboard/UpcomingDeadlines.jsx
import React from 'react';
import { FiCalendar, FiAlertTriangle } from 'react-icons/fi';

const UpcomingDeadlines = ({ deadlines }) => {
  const getPriorityBadge = (priority) => {
    const badgeMap = {
      Urgent: 'badge-urgent',
      High: 'badge-high',
      Medium: 'badge-medium',
      Low: 'badge-low'
    };
    return badgeMap[priority] || 'badge-medium';
  };

  const getStatusBadge = (status) => {
    const badgeMap = {
      'In Progress': 'badge-in-progress',
      'Under Review': 'badge-under-review',
      'Pending': 'badge-pending',
      'Completed': 'badge-completed'
    };
    return badgeMap[status] || 'badge-pending';
  };

  return (
    <div className="upcoming-deadlines-card">
      <div className="card-header-custom">
        <h5 className="card-title-custom">Upcoming Deadlines</h5>
        <button className="btn btn-link view-all-btn">View All</button>
      </div>

      <div className="deadlines-list">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="deadline-item">
            <div className="deadline-icon-wrapper">
              {deadline.daysLeft <= 2 ? (
                <FiAlertTriangle className="deadline-icon urgent" />
              ) : (
                <FiCalendar className="deadline-icon" />
              )}
            </div>
            <div className="deadline-content">
              <h6 className="deadline-project">{deadline.project}</h6>
              <div className="deadline-meta">
                <span className="deadline-date">
                  <FiCalendar className="meta-icon" />
                  {deadline.dueDate}
                </span>
                <span className={`deadline-days ${deadline.daysLeft <= 2 ? 'urgent' : ''}`}>
                  {deadline.daysLeft} days left
                </span>
              </div>
            </div>
            <div className="deadline-badges">
              <span className={`priority-badge ${getPriorityBadge(deadline.priority)}`}>
                {deadline.priority}
              </span>
              <span className={`status-badge ${getStatusBadge(deadline.status)}`}>
                {deadline.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;