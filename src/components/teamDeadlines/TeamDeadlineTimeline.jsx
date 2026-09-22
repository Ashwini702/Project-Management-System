// src/components/teamDeadlines/TeamDeadlineTimeline.jsx
import React from 'react';
import TeamDeadlineStatusBadge from './TeamDeadlineStatusBadge';

const TeamDeadlineTimeline = ({ deadlines }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now()+86400000).toISOString().split('T')[0];
  const weekEnd = new Date(Date.now()+7*86400000).toISOString().split('T')[0];
  const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).toISOString().split('T')[0];

  const groups = { Overdue: [], Today: [], Tomorrow: [], 'This Week': [], 'This Month': [], Later: [] };
  deadlines.forEach(d => {
    if (d.status === 'Overdue' || d.status === 'Missed' || d.daysRemaining < 0) groups['Overdue'].push(d);
    else if (d.dueDate === today) groups['Today'].push(d);
    else if (d.dueDate === tomorrow) groups['Tomorrow'].push(d);
    else if (d.dueDate <= weekEnd) groups['This Week'].push(d);
    else if (d.dueDate <= monthEnd) groups['This Month'].push(d);
    else groups['Later'].push(d);
  });

  return (
    <div className="td-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="td-tl-group">
          <h5 className="td-tl-group-title">{group} ({items.length})</h5>
          <div className="td-tl-items">
            {items.map(d => (
              <div key={d.id} className="td-tl-item">
                <div className="td-tl-time">{d.dueDate} {d.dueTime}</div>
                <div className="td-tl-dot"></div>
                <div className="td-tl-card">
                  <h6>{d.title}</h6>
                  <p>{d.projectName}{d.relatedTask ? ` • ${d.relatedTask}` : ''}</p>
                  <div className="td-tl-meta">
                    <TeamDeadlineStatusBadge status={d.status} />
                    <span className="td-tl-progress">{d.progress}%</span>
                    <span className={`td-tl-days ${d.daysRemaining < 0 ? 'text-danger' : ''}`}>{d.daysRemaining < 0 ? `${Math.abs(d.daysRemaining)}d over` : `${d.daysRemaining}d`}</span>
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
export default TeamDeadlineTimeline;