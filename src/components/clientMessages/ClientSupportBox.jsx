// src/components/clientMessages/ClientSupportBox.jsx
import React from 'react';
import { FiEye, FiCornerUpRight, FiXCircle } from 'react-icons/fi';
import ClientMessageStatusBadge from './ClientMessageStatusBadge';

const ClientSupportBox = ({ tickets, onView, onReply, onCloseTicket }) => (
  <div className="cmsg-support-box">
    <h6>Support Tickets</h6>
    {tickets.map(t => (
      <div key={t.id} className="cmsg-support-item">
        <div className="cmsg-support-header">
          <span className="cmsg-ticket-id">{t.ticketId}</span>
          <ClientMessageStatusBadge status={t.status} />
        </div>
        <strong>{t.subject}</strong>
        <div className="cmsg-support-meta">
          <span>{t.projectName} • {t.category}</span>
          <span>Assigned: {t.assignedTo}</span>
          <span className="cmsg-support-time">{t.lastUpdate}</span>
        </div>
        <div className="cmsg-support-actions">
          <button className="cmsg-btn" onClick={() => onView(t)}><FiEye /></button>
          <button className="cmsg-btn" onClick={() => onReply(t)}><FiCornerUpRight /></button>
          {t.status !== 'Closed' && t.status !== 'Resolved' && <button className="cmsg-btn close" onClick={() => onCloseTicket(t)}><FiXCircle /></button>}
        </div>
      </div>
    ))}
  </div>
);
export default ClientSupportBox;