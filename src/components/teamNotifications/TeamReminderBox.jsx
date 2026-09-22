// src/components/teamNotifications/TeamReminderBox.jsx
import React from 'react';
import { FiBell, FiClock, FiCheck } from 'react-icons/fi';
import { reminders } from '../../data/teamNotificationsData';

const TeamReminderBox = ({ onSendReminder, onSnooze, onMarkDone }) => (
  <div className="tn-reminder-box">
    <h6><FiBell /> Reminders</h6>
    {reminders.map(r => (
      <div key={r.id} className={`tn-reminder-item ${r.status === 'Completed' ? 'completed' : ''}`}>
        <div className="tn-rem-info">
          <strong>{r.title}</strong>
          <span>{r.relatedProject || 'General'} {r.relatedTask ? `• ${r.relatedTask}` : ''}</span>
          <span><FiClock /> {r.reminderDate} {r.reminderTime}</span>
        </div>
        <div className="tn-rem-actions">
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
);
export default TeamReminderBox;