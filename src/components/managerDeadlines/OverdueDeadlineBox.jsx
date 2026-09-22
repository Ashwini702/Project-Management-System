// src/components/managerDeadlines/OverdueDeadlineBox.jsx
import React from 'react';
import { FiAlertTriangle, FiRefreshCw, FiBell } from 'react-icons/fi';

const OverdueDeadlineBox = ({ overdueDeadlines, onReschedule, onSendReminder }) => (
  <div className="mdl-overdue-box">
    <h6><FiAlertTriangle className="text-danger" /> Overdue Deadlines</h6>
    {overdueDeadlines.map(d => (
      <div key={d.id} className="mdl-overdue-item">
        <div className="mdl-overdue-info">
          <strong>{d.title}</strong>
          <span>{d.project} • {d.assignee}</span>
          <span className="text-danger">Due: {d.originalDueDate} ({d.overdueDays}d overdue)</span>
        </div>
        <div className="mdl-overdue-actions">
          <button className="btn btn-sm btn-outline-warning" onClick={() => onReschedule(d)}><FiRefreshCw /> Reschedule</button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => onSendReminder(d)}><FiBell /> Remind</button>
        </div>
      </div>
    ))}
  </div>
);
export default OverdueDeadlineBox;