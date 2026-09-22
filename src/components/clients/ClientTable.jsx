// src/components/clients/ClientTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiSend } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';

const ClientTable = ({ clients, onView, onEdit, onDelete, onMessage }) => {
  return (
    <div className="table-responsive">
      <table className="table clients-table">
        <thead>
          <tr>
            <th>Client</th><th>Company</th><th>Email</th><th>Phone</th>
            <th>Industry</th><th>Projects</th><th>Payment</th><th>Status</th>
            <th>Last Contact</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr><td colSpan="10" className="text-center py-5"><p className="text-muted mb-0">No clients found</p></td></tr>
          ) : (
            clients.map(client => (
              <tr key={client.id}>
                <td>
                  <div className="client-cell">
                    <div className="client-avatar-sm">{client.company.split(' ').map(w => w[0]).join('').substring(0, 2)}</div>
                    <div><span className="client-name-text">{client.name}</span><small className="d-block text-muted">{client.company}</small></div>
                  </div>
                </td>
                <td>{client.company}</td>
                <td><span className="client-email-sm">{client.email}</span></td>
                <td>{client.phone}</td>
                <td><span className="industry-badge">{client.industry}</span></td>
                <td><span className="project-count">{client.assignedProjects.length}</span></td>
                <td><ClientStatusBadge status={client.paymentStatus} type="payment" /></td>
                <td><ClientStatusBadge status={client.status} /></td>
                <td>{client.lastCommunication}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn-icon view-btn" onClick={() => onView(client)} title="View"><FiEye /></button>
                    <button className="action-btn-icon edit-btn" onClick={() => onEdit(client)} title="Edit"><FiEdit2 /></button>
                    <button className="action-btn-icon msg-btn" onClick={() => onMessage(client)} title="Message"><FiSend /></button>
                    <button className="action-btn-icon delete-btn" onClick={() => onDelete(client)} title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;