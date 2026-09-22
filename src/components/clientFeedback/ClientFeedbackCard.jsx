// src/components/clientFeedback/ClientFeedbackCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiMessageSquare, FiStar, FiFolder, FiPaperclip } from 'react-icons/fi';
import ClientFeedbackStatusBadge from './ClientFeedbackStatusBadge';
import ClientFeedbackPriorityBadge from './ClientFeedbackPriorityBadge';

const ClientFeedbackCard = ({ feedback, onView, onEdit, onDelete, onAddResponse }) => (
  <div className="clfb-card">
    <div className="clfb-card-header">
      <h6>{feedback.title}</h6>
      <div className="clfb-card-badges">
        <ClientFeedbackPriorityBadge priority={feedback.priority} />
        <ClientFeedbackStatusBadge status={feedback.status} />
      </div>
    </div>
    <p className="clfb-card-msg">{feedback.message}</p>
    <div className="clfb-card-meta">
      <span><FiFolder /> {feedback.projectName}</span>
      <span className="clfb-card-rating">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < feedback.rating ? 'filled' : ''} />)}</span>
    </div>
    <div className="clfb-card-tags">
      <span className="clfb-cat-tag">{feedback.category}</span>
      {feedback.attachmentCount > 0 && <span className="clfb-attach-tag"><FiPaperclip /> {feedback.attachmentCount}</span>}
    </div>
    <div className="clfb-card-footer">
      <span className="clfb-card-date">{feedback.submittedDate}</span>
      <div className="clfb-card-actions">
        <button className="clfb-btn" onClick={() => onView(feedback)}><FiEye /></button>
        <button className="clfb-btn" onClick={() => onEdit(feedback)}><FiEdit2 /></button>
        <button className="clfb-btn" onClick={() => onAddResponse(feedback)}><FiMessageSquare /></button>
        <button className="clfb-btn delete" onClick={() => onDelete(feedback)}><FiTrash2 /></button>
      </div>
    </div>
  </div>
);
export default ClientFeedbackCard;