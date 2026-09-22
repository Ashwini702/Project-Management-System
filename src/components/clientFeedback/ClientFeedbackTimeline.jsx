// src/components/clientFeedback/ClientFeedbackTimeline.jsx
import React from 'react';
import { feedbackList } from '../../data/clientFeedbackData';
import ClientFeedbackStatusBadge from './ClientFeedbackStatusBadge';

const ClientFeedbackTimeline = () => {
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
    <div className="clfb-timeline">
      {Object.entries(groups).map(([group, items]) => items.length > 0 && (
        <div key={group} className="clfb-tl-group">
          <h5 className="clfb-tl-group-title">{group} ({items.length})</h5>
          <div className="clfb-tl-items">
            {items.map(f => (
              <div key={f.id} className="clfb-tl-item">
                <div className="clfb-tl-time">{f.submittedDate}</div>
                <div className="clfb-tl-dot"></div>
                <div className="clfb-tl-card">
                  <h6>{f.title}</h6>
                  <p>{f.message.substring(0, 80)}...</p>
                  <div className="clfb-tl-meta">
                    <span>{f.projectName} • {f.category}</span>
                    <ClientFeedbackStatusBadge status={f.status} />
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
export default ClientFeedbackTimeline;