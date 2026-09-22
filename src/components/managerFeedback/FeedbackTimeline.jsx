// src/components/managerFeedback/FeedbackTimeline.jsx
import React from 'react';
import { feedbackList } from '../../data/managerFeedbackData';

const FeedbackTimeline = () => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

  const groups = { Today: [], Yesterday: [], 'This Week': [], Older: [] };
  feedbackList.forEach(f => {
    if (f.submittedDate === today) groups['Today'].push(f);
    else if (f.submittedDate === yesterday) groups['Yesterday'].push(f);
    else if (f.submittedDate >= weekAgo) groups['This Week'].push(f);
    else groups['Older'].push(f);
  });

  return (
    <div className="mfb-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="mfb-tl-group">
          <h5 className="mfb-tl-group-title">{group} ({items.length})</h5>
          <div className="mfb-tl-items">
            {items.map(f => (
              <div key={f.id} className="mfb-tl-item">
                <div className="mfb-tl-time">{f.submittedDate}</div>
                <div className="mfb-tl-dot"></div>
                <div className="mfb-tl-card">
                  <h6>{f.title}</h6>
                  <p>{f.message.substring(0, 80)}...</p>
                  <div className="mfb-tl-meta">
                    <span>{f.clientName} • {f.projectName}</span>
                    <FeedbackStatusBadge status={f.status} />
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
export default FeedbackTimeline;