// src/components/teamDeadlines/UpcomingDeadlineBox.jsx
import React from 'react';
import { upcomingDeadlines } from '../../data/teamDeadlinesData';
import TeamDeadlinePriorityBadge from './TeamDeadlinePriorityBadge';

const UpcomingDeadlineBox = () => (
  <div className="td-upcoming-box">
    <h6>Upcoming Deadlines</h6>
    {upcomingDeadlines.map(d => (
      <div key={d.id} className="td-upcoming-item">
        <div className="td-upcoming-info">
          <strong>{d.title}</strong>
          <span>{d.project} • Due: {d.dueDate} {d.dueTime}</span>
        </div>
        <TeamDeadlinePriorityBadge priority={d.priority} />
      </div>
    ))}
  </div>
);
export default UpcomingDeadlineBox;