// src/components/managerDeadlines/DeadlineTimelineView.jsx
import React from 'react';
import { FiClock, FiUser, FiFolder } from 'react-icons/fi';
import DeadlineStatusBadge from './DeadlineStatusBadge';
import DeadlinePriorityBadge from './DeadlinePriorityBadge';

const DeadlineTimelineView = ({ deadlines }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];

  const groups = { Overdue: [], Today: [], Tomorrow: [], 'This Week': [], 'This Month': [], Later: [] };

  deadlines.forEach(d => {
    if (d.status === 'Overdue' || d.daysRemaining < 0) groups['Overdue'].push(d);
    else if (d.dueDate === today) groups['Today'].push(d);
    else if (d.dueDate === tomorrow) groups['Tomorrow'].push(d);
    else if (d.dueDate <= weekEnd) groups['This Week'].push(d);
    else if (d.dueDate <= monthEnd) groups['This Month'].push(d);
    else groups['Later'].push(d);
  });

  return (
    <div className="mdl-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="mdl-tl-group">
          <h5 className="mdl-tl-group-title">{group} ({items.length})</h5>
          <div className="mdl-tl-items">
            {items.map(d => (
              <div key={d.id} className={`mdl-tl-item ${d.status === 'Overdue' ? 'overdue' : ''}`}>
                <div className="mdl-tl-time">{d.dueDate}</div>
                <div className="mdl-tl-dot"></div>
                <div className="mdl-tl-card">
                  <div className="mdl-tl-card-header">
                    <h6>{d.title}</h6>
                    <div className="d-flex gap-2"><DeadlinePriorityBadge priority={d.priority} /><DeadlineStatusBadge status={d.status} /></div>
                  </div>
                  <div className="mdl-tl-card-meta">
                    <span><FiFolder /> {d.project}</span><span><FiUser /> {d.assignee}</span>
                    <span className={`mdl-tl-days ${d.daysRemaining < 0 ? 'text-danger' : ''}`}>{d.daysRemaining < 0 ? `${Math.abs(d.daysRemaining)}d overdue` : `${d.daysRemaining}d left`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default DeadlineTimelineView;