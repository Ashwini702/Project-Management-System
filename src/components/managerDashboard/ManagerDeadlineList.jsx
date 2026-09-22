// src/components/managerDashboard/ManagerDeadlineList.jsx
import React from 'react';
import { FiAlertTriangle, FiClock } from 'react-icons/fi';

const ManagerDeadlineList = ({ deadlines }) => (
  <div className="mgr-deadline-list">
    <h6>Upcoming Deadlines</h6>
    {deadlines.map(d => (
      <div key={d.id} className={`mgr-deadline-item ${d.status === 'Overdue' ? 'overdue' : ''}`}>
        <div className="mgr-dl-icon">{d.status === 'Overdue' ? <FiAlertTriangle className="text-danger" /> : <FiClock className="text-warning" />}</div>
        <div className="mgr-dl-content">
          <span className="mgr-dl-title">{d.title}</span><span>{d.project} • {d.assignedTo}</span><span className="mgr-dl-date">Due: {d.dueDate}</span>
        </div>
        <span className={`mgr-dl-days ${d.daysLeft < 0 ? 'text-danger' : d.daysLeft <= 3 ? 'text-warning' : ''}`}>{d.daysLeft < 0 ? `${Math.abs(d.daysLeft)}d overdue` : `${d.daysLeft}d`}</span>
      </div>
    ))}
  </div>
);
export default ManagerDeadlineList;