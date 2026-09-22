// src/components/managerFeedback/ClientSatisfactionBox.jsx
import React from 'react';
import { FiStar } from 'react-icons/fi';

const ClientSatisfactionBox = ({ data }) => (
  <div className="mfb-satisfaction">
    <div className="mfb-sat-grid">
      {data.map(c => (
        <div key={c.clientName} className="mfb-sat-card">
          <h6>{c.clientName}</h6>
          <span>{c.company}</span>
          <div className="mfb-sat-stats">
            <span>Projects: {c.projects}</span><span>Feedback: {c.feedbackCount}</span>
          </div>
          <div className="mfb-sat-rating">
            <span className="mfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < Math.round(c.avgRating) ? 'filled' : ''} />)} {c.avgRating}</span>
          </div>
          <div className="mfb-sat-progress">
            <div className="progress"><div className="progress-bar" style={{ width: `${c.satisfaction}%`, backgroundColor: c.satisfaction >= 80 ? 'var(--success-color)' : c.satisfaction >= 60 ? 'var(--warning-color)' : 'var(--danger-color)' }}></div></div>
            <small>{c.satisfaction}% - {c.status}</small>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ClientSatisfactionBox;