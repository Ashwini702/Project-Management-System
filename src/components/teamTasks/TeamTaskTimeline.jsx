// src/components/teamTasks/TeamTaskTimeline.jsx
import React from 'react';
import TeamTaskStatusBadge from './TeamTaskStatusBadge';

const TeamTaskTimeline = ({ timeline }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const groups = { Today: [], Tomorrow: [], 'This Week': [], Upcoming: [], Overdue: [] };
  timeline.forEach(t => {
    if (t.status === 'Overdue') groups['Overdue'].push(t);
    else if (t.deadline === today) groups['Today'].push(t);
    else if (t.deadline === tomorrow) groups['Tomorrow'].push(t);
    else if (t.deadline <= weekEnd) groups['This Week'].push(t);
    else groups['Upcoming'].push(t);
  });

  return (
    <div className="tt-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="tt-tl-group">
          <h5 className="tt-tl-group-title">{group} ({items.length})</h5>
          <div className="tt-tl-items">
            {items.map(t => (
              <div key={t.id} className="tt-tl-item">
                <div className="tt-tl-time">{t.deadline}</div>
                <div className="tt-tl-dot"></div>
                <div className="tt-tl-card">
                  <h6>{t.title}</h6>
                  <p>{t.note}</p>
                  <div className="tt-tl-meta">
                    <span>{t.projectName}</span>
                    <TeamTaskStatusBadge status={t.status} />
                    <span className="tt-tl-progress">{t.progress}%</span>
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
export default TeamTaskTimeline;