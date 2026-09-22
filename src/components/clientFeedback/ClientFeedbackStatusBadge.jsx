// src/components/clientFeedback/ClientFeedbackStatusBadge.jsx
import React from 'react';
const ClientFeedbackStatusBadge = ({ status }) => {
  const map = { 'Pending': 'clfb-status-pending', 'In Review': 'clfb-status-review', 'Approved': 'clfb-status-approved', 'Rejected': 'clfb-status-rejected', 'Resolved': 'clfb-status-resolved' };
  return <span className={`clfb-badge ${map[status] || ''}`}>{status}</span>;
};
export default ClientFeedbackStatusBadge;