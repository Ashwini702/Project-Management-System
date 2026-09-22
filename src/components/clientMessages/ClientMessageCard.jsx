// src/components/clientMessages/ClientMessageCard.jsx
import React from 'react';
import { FiEye, FiCornerUpRight, FiCheck, FiMail, FiStar, FiArchive, FiTrash2, FiPaperclip } from 'react-icons/fi';
import ClientMessageStatusBadge from './ClientMessageStatusBadge';
import ClientMessageTypeBadge from './ClientMessageTypeBadge';

const ClientMessageCard = ({ message, onView, onReply, onToggleRead, onToggleImportant, onArchive, onDelete }) => (
  <div className={`cmsg-card ${!message.isRead ? 'unread' : ''} ${message.status === 'Important' ? 'important' : ''}`}>
    <div className="cmsg-card-avatar">{message.senderName.split(' ').map(n => n[0]).join('')}</div>
    <div className="cmsg-card-body">
      <div className="cmsg-card-header">
        <div>
          <strong>{message.senderName}</strong>
          <span>{message.senderRole}</span>
          <ClientMessageTypeBadge type={message.type} />
        </div>
        <ClientMessageStatusBadge status={message.status} />
      </div>
      <h6 className="cmsg-card-subject">{message.subject}</h6>
      <p className="cmsg-card-msg">{message.message}</p>
      <div className="cmsg-card-meta">
        <span>{message.projectName}</span>
        {message.attachmentCount > 0 && <span><FiPaperclip /> {message.attachmentCount}</span>}
        <span className="cmsg-card-time">{message.sentAt}</span>
      </div>
      <div className="cmsg-card-actions">
        <button className="cmsg-btn" onClick={() => onView(message)}><FiEye /></button>
        <button className="cmsg-btn" onClick={() => onReply(message)}><FiCornerUpRight /></button>
        <button className="cmsg-btn" onClick={() => onToggleRead(message)} title={message.isRead ? 'Mark Unread' : 'Mark Read'}>{message.isRead ? <FiMail /> : <FiCheck />}</button>
        <button className="cmsg-btn" onClick={() => onToggleImportant(message)}><FiStar /></button>
        <button className="cmsg-btn" onClick={() => onArchive(message)}><FiArchive /></button>
        <button className="cmsg-btn delete" onClick={() => onDelete(message)}><FiTrash2 /></button>
      </div>
    </div>
  </div>
);
export default ClientMessageCard;