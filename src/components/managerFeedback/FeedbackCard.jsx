// src/components/managerFeedback/FeedbackCard.jsx
import React from 'react';
import { FiEye, FiEdit3, FiCheck, FiThumbsUp, FiThumbsDown, FiTrash2, FiUser, FiFolder, FiStar } from 'react-icons/fi';
import FeedbackStatusBadge from './FeedbackStatusBadge';
import FeedbackPriorityBadge from './FeedbackPriorityBadge';

const FeedbackCard = ({ feedback, onView, onRespond, onResolve, onApprove, onReject, onDelete }) => (
  <div className="mfb-card">
    <div className="mfb-card-header">
      <h6>{feedback.title}</h6>
      <div className="mfb-card-badges">
        <FeedbackPriorityBadge priority={feedback.priority} />
        <FeedbackStatusBadge status={feedback.status} />
      </div>
    </div>
    <p className="mfb-card-msg">{feedback.message}</p>
    <div className="mfb-card-meta">
      <span><FiUser /> {feedback.clientName}</span>
      <span>{feedback.companyName}</span>
      <span><FiFolder /> {feedback.projectName}</span>
    </div>
    <div className="mfb-card-category">
      <span className="mfb-cat-tag">{feedback.category}</span>
      <span className="mfb-rating">
        {[...Array(5)].map((_, i) => <FiStar key={i} className={i < feedback.rating ? 'filled' : ''} />)}
      </span>
    </div>
    <div className="mfb-card-footer">
      <span className="mfb-card-date">{feedback.submittedDate}</span>
      <div className="mfb-card-actions">
        <button className="mfb-btn" onClick={() => onView(feedback)}><FiEye /></button>
        <button className="mfb-btn" onClick={() => onRespond(feedback)}><FiEdit3 /></button>
        {feedback.status !== 'Resolved' && <button className="mfb-btn resolve" onClick={() => onResolve(feedback)}><FiCheck /></button>}
        <button className="mfb-btn approve" onClick={() => onApprove(feedback)}><FiThumbsUp /></button>
        <button className="mfb-btn reject" onClick={() => onReject(feedback)}><FiThumbsDown /></button>
        <button className="mfb-btn delete" onClick={() => onDelete(feedback)}><FiTrash2 /></button>
      </div>
    </div>
  </div>
);
export default FeedbackCard;