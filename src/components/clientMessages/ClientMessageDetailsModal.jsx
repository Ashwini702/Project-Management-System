// src/components/clientMessages/ClientMessageDetailsModal.jsx
import React from 'react';
import { FiX, FiFolder, FiMail, FiPaperclip, FiClock } from 'react-icons/fi';
import ClientMessageStatusBadge from './ClientMessageStatusBadge';
import ClientMessageTypeBadge from './ClientMessageTypeBadge';

const ClientMessageDetailsModal = ({ show, onClose, message }) => {
  if (!show || !message) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{message.subject}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="cmsg-detail-badges"><ClientMessageTypeBadge type={message.type} /><ClientMessageStatusBadge status={message.status} /></div>
        <div className="cmsg-detail-meta mt-3">
          <div><FiMail /><strong>From:</strong> {message.senderName} ({message.senderRole})</div>
          <div><FiFolder /><strong>Project:</strong> {message.projectName}</div>
          <div><FiClock /><strong>Sent:</strong> {message.sentAt}</div>
          {message.attachmentCount > 0 && <div><FiPaperclip /> {message.attachmentCount} attachments</div>}
        </div>
        <p className="mt-3">{message.message}</p>
        {message.replies?.length > 0 && (
          <div className="mt-3">
            <h6>Replies</h6>
            {message.replies.map(r => (
              <div key={r.id} className="cmsg-reply-item"><strong>{r.senderName}</strong><p>{r.message}</p><small>{r.dateTime}</small></div>
            ))}
          </div>
        )}
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default ClientMessageDetailsModal;