// src/components/clients/ClientCard.jsx
import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiFolder, FiCheckCircle, FiMessageSquare, FiEye, FiEdit2, FiTrash2, FiSend } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';

const ClientCard = ({ client, onView, onEdit, onDelete, onMessage }) => {
  return (
    <div className="client-card">
      <div className="client-card-header">
        <div className="client-card-actions">
          <button className="cca-btn" onClick={() => onView(client)} title="View"><FiEye /></button>
          <button className="cca-btn" onClick={() => onEdit(client)} title="Edit"><FiEdit2 /></button>
          <button className="cca-btn" onClick={() => onMessage(client)} title="Send Message"><FiSend /></button>
          <button className="cca-btn" onClick={() => onDelete(client)} title="Delete"><FiTrash2 /></button>
        </div>
      </div>
      <div className="client-card-body">
        <div className="client-avatar-section">
          <div className="client-avatar-lg">{client.company.split(' ').map(w => w[0]).join('').substring(0, 2)}</div>
          <ClientStatusBadge status={client.status} />
        </div>
        <h5 className="client-name">{client.name}</h5>
        <p className="client-company">{client.company}</p>
        <span className="industry-badge">{client.industry}</span>
        <div className="client-contact">
          <div className="contact-row"><FiMail /><span>{client.email}</span></div>
          <div className="contact-row"><FiPhone /><span>{client.phone}</span></div>
          <div className="contact-row"><FiMapPin /><span>{client.city}</span></div>
        </div>
        <div className="client-stats-row">
          <div className="cstat-item"><FiFolder /><span>{client.assignedProjects.length} Active</span></div>
          <div className="cstat-item"><FiCheckCircle /><span>{client.completedProjects} Done</span></div>
          <div className="cstat-item"><FiMessageSquare /><span>{client.pendingFeedback} Feedback</span></div>
        </div>
        <div className="client-payment-row">
          <ClientStatusBadge status={client.paymentStatus} type="payment" />
          <span className="payment-amount">₹{client.paidAmount.toLocaleString('en-IN')} / ₹{client.projectValue.toLocaleString('en-IN')}</span>
        </div>
        <div className="client-last-contact">
          <small>Last contact: {client.lastCommunication}</small>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;