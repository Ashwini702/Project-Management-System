// src/components/teamDashboard/TeamDeadlineList.jsx
import React from 'react';
import { FiAlertTriangle, FiClock } from 'react-icons/fi';
import { teamDeadlines } from '../../data/teamDashboardData';

const TeamDeadlineList = () => (
  <div className="tm-deadline-list">
    <h6>Upcoming Deadlines</h6>
    {teamDeadlines.map(d => (
      <div key={d.id} className={`tm-deadline-item ${d.status === 'Urgent' ? 'urgent' : ''}`}>
        <div className="tm-deadline-icon">{d.status === 'Urgent' ? <FiAlertTriangle className="text-danger" /> : <FiClock className="text-warning" />}</div>
        <div className="tm-deadline-content">
          <span className="tm-deadline-title">{d.title}</span><span className="tm-deadline-project">{d.project} • Due: {d.dueDate}</span>
        </div>
        <span className={`tm-deadline-days ${d.daysLeft <= 1 ? 'text-danger' : d.daysLeft <= 3 ? 'text-warning' : ''}`}>{d.daysLeft}d</span>
      </div>
    ))}
  </div>
);
export default TeamDeadlineList;