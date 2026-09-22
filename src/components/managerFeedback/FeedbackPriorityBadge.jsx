// src/components/managerFeedback/FeedbackPriorityBadge.jsx
import React from 'react';
const FeedbackPriorityBadge = ({ priority }) => {
  const map = { 'Low': 'mfb-priority-low', 'Medium': 'mfb-priority-medium', 'High': 'mfb-priority-high', 'Urgent': 'mfb-priority-urgent' };
  return <span className={`mfb-badge ${map[priority] || ''}`}>{priority}</span>;
};
export default FeedbackPriorityBadge;