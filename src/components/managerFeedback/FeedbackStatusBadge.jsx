// src/components/managerFeedback/FeedbackStatusBadge.jsx
import React from 'react';
const FeedbackStatusBadge = ({ status }) => {
  const map = { 'Pending': 'mfb-status-pending', 'In Review': 'mfb-status-review', 'Approved': 'mfb-status-approved', 'Rejected': 'mfb-status-rejected', 'Resolved': 'mfb-status-resolved' };
  return <span className={`mfb-badge ${map[status] || ''}`}>{status}</span>;
};
export default FeedbackStatusBadge;