// src/components/managerNotifications/ManagerReminderBox.jsx
import React from 'react';
import { FiBell, FiClock, FiCheck } from 'react-icons/fi';

const ManagerReminderBox = ({ reminders, onSendReminder, onSnooze, onMarkDone }) => (
  <div className="mgn-reminder-box">
    <h6><FiBell /> Reminders</h6>
    <div className="mgn-reminder-list">
      {reminders.map(r => (
        <div key={r.id} className={`mgn-reminder-item ${r.status === 'Completed' ? 'completed' : ''}`}>
          <div className="mgn-rem-info">
            <strong>{r.title}</strong>
            <span>{r.relatedProject} • {r.relatedTask}</span>
            <span><FiClock /> Due: {r.dueDate} | Reminder: {r.reminderTime}</span>
            <span className={`priority-dot priority-${r.priority?.toLowerCase()}`}></span> {r.priority}
          </div>
          <div className="mgn-rem-actions">
            {r.status !== 'Completed' && (
              <>
                <button className="btn btn-sm btn-outline-primary" onClick={() => onSendReminder(r)}><FiBell /> Send</button>
                <button className="btn btn-sm btn-outline-warning" onClick={() => onSnooze(r)}>Snooze</button>
                <button className="btn btn-sm btn-outline-success" onClick={() => onMarkDone(r)}><FiCheck /> Done</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ManagerReminderBox;