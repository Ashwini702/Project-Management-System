// src/components/managerDashboard/ManagerClientFeedback.jsx
import React from 'react';
import { FiEye, FiCheck } from 'react-icons/fi';

const ManagerClientFeedback = ({ feedback, onView, onResolve }) => (
  <div className="mgr-feedback-list">
    <h6>Client Feedback</h6>
    {feedback.map(f => (
      <div key={f.id} className="mgr-fb-item">
        <div className="mgr-fb-header">
          <strong>{f.clientName}</strong><span>{f.company}</span>
          <span className={`mgr-fb-status ${f.status.toLowerCase()}`}>{f.status}</span>
        </div>
        <p>{f.message}</p>
        <span>{f.project} • {f.date}</span>
        <div className="mgr-fb-actions">
          <button className="mgr-fb-btn" onClick={() => onView(f)}><FiEye /> View</button>
          {f.status !== 'Resolved' && <button className="mgr-fb-btn resolve" onClick={() => onResolve(f)}><FiCheck /> Resolve</button>}
        </div>
      </div>
    ))}
  </div>
);
export default ManagerClientFeedback;