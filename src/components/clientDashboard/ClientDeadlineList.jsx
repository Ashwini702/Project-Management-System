// src/components/clientDashboard/ClientDeadlineList.jsx
import React from 'react';
import { FiAlertTriangle, FiClock, FiCheckCircle } from 'react-icons/fi';

const ClientDeadlineList = ({ deadlines }) => (
  <div className="cl-deadline-list">
    <h6>Upcoming Deadlines</h6>
    {deadlines.map(d => (
      <div key={d.id} className={`cl-deadline-item ${d.status === 'Overdue' ? 'overdue' : ''}`}>
        <div className="cl-deadline-icon">{d.status === 'Overdue' ? <FiAlertTriangle className="text-danger" /> : d.status === 'Completed' ? <FiCheckCircle className="text-success" /> : <FiClock className="text-warning" />}</div>
        <div className="cl-deadline-content">
          <span className="cl-deadline-title">{d.title}</span>
          <span className="cl-deadline-project">{d.project} • Due: {d.dueDate}</span>
        </div>
        <span className={`cl-deadline-days ${d.daysLeft < 0 ? 'text-danger' : d.daysLeft <= 3 ? 'text-warning' : ''}`}>
          {d.daysLeft < 0 ? `${Math.abs(d.daysLeft)}d overdue` : `${d.daysLeft}d left`}
        </span>
      </div>
    ))}
  </div>
);

export default ClientDeadlineList;