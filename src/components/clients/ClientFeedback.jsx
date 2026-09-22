// src/components/clients/ClientFeedback.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ClientFeedback = ({ feedbacks = [] }) => {
  const [feedbacksList, setFeedbacksList] = useState(feedbacks);
  const [newFeedback, setNewFeedback] = useState('');

  const addFeedback = () => {
    if (newFeedback.trim()) {
      setFeedbacksList([...feedbacksList, { id: Date.now(), message: newFeedback, project: 'General', date: new Date().toISOString().split('T')[0], status: 'Pending' }]);
      setNewFeedback('');
    }
  };

  return (
    <div className="client-feedback">
      <h6>Feedback</h6>
      <div className="feedback-list">
        {feedbacksList.map(fb => (
          <div key={fb.id} className="feedback-item">
            <p className="feedback-message">{fb.message}</p>
            <div className="feedback-meta"><span className="feedback-project">{fb.project}</span><span className="feedback-date">{fb.date}</span><span className={`feedback-status fb-${fb.status.toLowerCase()}`}>{fb.status}</span></div>
          </div>
        ))}
      </div>
      <div className="feedback-input-row">
        <textarea className="form-control" rows="2" placeholder="Add feedback..." value={newFeedback} onChange={(e) => setNewFeedback(e.target.value)}></textarea>
        <button className="btn btn-sm btn-primary" onClick={addFeedback}><FiSend /> Add</button>
      </div>
    </div>
  );
};

export default ClientFeedback;