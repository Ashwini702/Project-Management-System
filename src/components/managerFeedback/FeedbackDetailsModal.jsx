// src/components/managerFeedback/FeedbackDetailsModal.jsx
import React from 'react';
import { FiX, FiUser, FiFolder, FiMail, FiStar, FiClock, FiPaperclip } from 'react-icons/fi';
import FeedbackStatusBadge from './FeedbackStatusBadge';
import FeedbackPriorityBadge from './FeedbackPriorityBadge';

const FeedbackDetailsModal = ({ show, onClose, feedback }) => {
  if (!show || !feedback) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{feedback.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="mfb-detail-badges"><FeedbackPriorityBadge priority={feedback.priority} /><FeedbackStatusBadge status={feedback.status} /><span className="mfb-cat-tag">{feedback.category}</span></div>
        <p className="mt-3">{feedback.message}</p>
        <div className="mfb-detail-grid">
          <div><FiUser /><strong>Client:</strong> {feedback.clientName}</div>
          <div><FiFolder /><strong>Company:</strong> {feedback.companyName}</div>
          <div><FiMail /><strong>Email:</strong> {feedback.clientEmail}</div>
          <div><FiFolder /><strong>Project:</strong> {feedback.projectName}</div>
          <div><strong>Rating:</strong> <span className="mfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < feedback.rating ? 'filled' : ''} />)}</span></div>
          <div><FiClock /><strong>Submitted:</strong> {feedback.submittedDate}</div>
          <div><strong>Manager:</strong> {feedback.assignedManager}</div>
          <div><strong>Last Response:</strong> {feedback.lastResponseDate}</div>
        </div>
        {feedback.responses.length > 0 && (
          <div className="mt-4">
            <h6>Response History</h6>
            {feedback.responses.map(r => (
              <div key={r.id} className="mfb-response-item">
                <strong>{r.responderName}</strong><span>{r.responderRole} • {r.dateTime}</span>
                <p>{r.message}</p>
                <small>Status: {r.statusUpdate}</small>
              </div>
            ))}
          </div>
        )}
        {feedback.activity.length > 0 && (
          <div className="mt-3">
            <h6>Activity</h6>
            {feedback.activity.map((a, i) => (
              <div key={i} className="mfb-activity-item"><span>{a.title}</span><span className="text-muted"> by {a.user} • {a.dateTime}</span></div>
            ))}
          </div>
        )}
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default FeedbackDetailsModal;