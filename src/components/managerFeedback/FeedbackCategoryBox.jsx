// src/components/managerFeedback/FeedbackCategoryBox.jsx
import React from 'react';

const FeedbackCategoryBox = ({ categories }) => (
  <div className="mfb-cat-box">
    <h6>Category Analysis</h6>
    <div className="mfb-cat-grid">
      {categories.map(c => (
        <div key={c.category} className="mfb-cat-card">
          <div className="mfb-cat-header">
            <span className="mfb-cat-dot" style={{ background: c.color }}></span>
            <strong>{c.category}</strong>
          </div>
          <div className="mfb-cat-stats">
            <span>Total: {c.total}</span><span className="text-warning">Pending: {c.pending}</span><span className="text-success">Resolved: {c.resolved}</span>
          </div>
          <div className="mfb-cat-rating">Rating: {c.avgRating}/5</div>
          <div className="progress mt-1"><div className="progress-bar" style={{ width: `${(c.resolved / c.total) * 100}%`, background: c.color }}></div></div>
        </div>
      ))}
    </div>
  </div>
);
export default FeedbackCategoryBox;