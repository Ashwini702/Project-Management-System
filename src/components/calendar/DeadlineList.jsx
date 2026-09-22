// src/components/calendar/DeadlineList.jsx
import React from 'react';
import { FiAlertTriangle, FiClock, FiCheckCircle } from 'react-icons/fi';

const DeadlineList = ({ deadlines }) => {
  return (
    <div className="deadline-list-card">
      <h6 className="section-title">Project Deadlines</h6>
      {deadlines.map(d => (
        <div key={d.id} className={`deadline-item ${d.status === 'Overdue' ? 'overdue' : d.status === 'Completed' ? 'completed' : ''}`}>
          <div className="deadline-icon-wrap">
            {d.status === 'Overdue' ? <FiAlertTriangle className="deadline-icon danger" /> : d.status === 'Completed' ? <FiCheckCircle className="deadline-icon success" /> : <FiClock className="deadline-icon" />}
          </div>
          <div className="deadline-content">
            <h6>{d.title}</h6>
            <span>{d.project} • Due: {d.dueDate}</span>
          </div>
          <span className={`deadline-days ${d.daysLeft < 0 ? 'overdue-text' : d.daysLeft <= 2 ? 'urgent-text' : ''}`}>
            {d.daysLeft < 0 ? `${Math.abs(d.daysLeft)}d overdue` : d.daysLeft === 0 ? 'Today' : `${d.daysLeft}d left`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DeadlineList;