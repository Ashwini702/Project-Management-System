// src/components/managerDeadlines/DeadlineReminderBox.jsx
import React from 'react';
import { FiBell, FiClock } from 'react-icons/fi';

const DeadlineReminderBox = ({ reminders, onSendReminder }) => (
  <div className="mdl-reminder-box">
    <h6><FiBell /> Reminders</h6>
    {reminders.map(r => (
      <div key={r.id} className="mdl-reminder-item">
        <div className="mdl-rem-info">
          <strong>{r.title}</strong>
          <span>{r.relatedItem} • Due: {r.dueDate}</span>
          <span><FiClock /> Reminder: {r.reminderTime}</span>
        </div>
        <button className="btn btn-sm btn-outline-primary" onClick={() => onSendReminder(r)}><FiBell /> Send</button>
      </div>
    ))}
  </div>
);
export default DeadlineReminderBox;