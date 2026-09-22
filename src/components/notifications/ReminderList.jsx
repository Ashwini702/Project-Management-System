// src/components/notifications/ReminderList.jsx
import React from 'react';
import { FiAlertTriangle, FiClock } from 'react-icons/fi';

const ReminderList = ({ reminders }) => (
  <div className="reminder-list">
    <h6><FiClock /> Deadline Reminders</h6>
    <div className="reminder-items">
      {reminders.map(r => (
        <div key={r.id} className={`reminder-item ${r.status === 'Overdue' ? 'overdue' : ''}`}>
          <div className="reminder-icon">{r.status === 'Overdue' ? <FiAlertTriangle className="text-danger" /> : <FiClock className="text-warning" />}</div>
          <div className="reminder-content">
            <h6>{r.title}</h6>
            <span>{r.project}{r.task ? ` • ${r.task}` : ''}</span>
            <span className="reminder-due">Due: {r.dueDate}</span>
          </div>
          <span className={`reminder-days ${r.daysLeft < 0 ? 'text-danger' : r.daysLeft <= 2 ? 'text-warning' : ''}`}>
            {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)}d overdue` : `${r.daysLeft}d left`}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ReminderList;