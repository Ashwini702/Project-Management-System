// src/components/teamReports/ReportTimeline.jsx
import React from 'react';
import ReportStatusBadge from './ReportStatusBadge';

const ReportTimeline = ({ timeline }) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];

  const groups = { Today: [], Yesterday: [], 'This Week': [], 'This Month': [], Older: [] };
  timeline.forEach(t => {
    const d = t.dateTime.split(' ')[0];
    if (d === today) groups['Today'].push(t);
    else if (d === yesterday) groups['Yesterday'].push(t);
    else if (d >= weekAgo) groups['This Week'].push(t);
    else if (d >= monthAgo) groups['This Month'].push(t);
    else groups['Older'].push(t);
  });

  return (
    <div className="tdr-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="tdr-tl-group">
          <h5 className="tdr-tl-group-title">{group} ({items.length})</h5>
          <div className="tdr-tl-items">
            {items.map(t => (
              <div key={t.id} className="tdr-tl-item">
                <div className="tdr-tl-time">{t.dateTime.split(' ')[0]}</div>
                <div className="tdr-tl-dot"></div>
                <div className="tdr-tl-card">
                  <h6>{t.title}</h6>
                  <p>{t.workSummary}</p>
                  <div className="tdr-tl-meta">
                    <span>{t.projectName} • {t.taskName}</span>
                    <span>{t.workHours}h</span>
                    <ReportStatusBadge status={t.status} />
                    <span className="tdr-tl-prod">{t.productivityScore}%</span>
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
export default ReportTimeline;