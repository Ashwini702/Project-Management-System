// src/components/clientFeedback/ClientFeedbackDetailsModal.jsx
import React from 'react';
import { FiX, FiFolder, FiStar, FiPaperclip, FiClock } from 'react-icons/fi';
import ClientFeedbackStatusBadge from './ClientFeedbackStatusBadge';
import ClientFeedbackPriorityBadge from './ClientFeedbackPriorityBadge';
import ClientFeedbackResponseBox from './ClientFeedbackResponseBox';

const ClientFeedbackDetailsModal = ({ show, onClose, feedback, onAddResponse }) => {
  if (!show || !feedback) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{feedback.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="clfb-detail-badges"><ClientFeedbackPriorityBadge priority={feedback.priority} /><ClientFeedbackStatusBadge status={feedback.status} /><span className="clfb-cat-tag">{feedback.category}</span></div>
        <p className="mt-3">{feedback.message}</p>
        <div className="clfb-detail-meta">
          <span><FiFolder /> {feedback.projectName}</span>
          <span className="clfb-rating-sm">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < feedback.rating ? 'filled' : ''} />)}</span>
          <span><FiClock /> {feedback.submittedDate}</span>
        </div>
        {feedback.attachmentCount > 0 && <div className="mt-2"><FiPaperclip /> {feedback.attachmentCount} attachments</div>}
        <div className="mt-4">
          <h6>Activity</h6>
          {feedback.activity?.map((a, i) => <div key={i} className="clfb-activity-item"><strong>{a.title}</strong><span> by {a.user} • {a.dateTime}</span></div>)}
        </div>
        <div className="mt-3">
          <ClientFeedbackResponseBox responses={feedback.responses} feedbackId={feedback.id} onAddResponse={onAddResponse} />
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default ClientFeedbackDetailsModal;