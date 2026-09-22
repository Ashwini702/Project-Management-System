// src/components/clientFeedback/ClientFeedbackPriorityBadge.jsx
import React from 'react';
const ClientFeedbackPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'clfb-priority-low', 'Medium': 'clfb-priority-medium', 'High': 'clfb-priority-high', 'Urgent': 'clfb-priority-urgent' };
  return <span className={`clfb-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default ClientFeedbackPriorityBadge;