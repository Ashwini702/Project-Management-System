// src/components/reports/ReportStatusBadge.jsx
import React from 'react';

const ReportStatusBadge = ({ status, type = 'status' }) => {
  if (type === 'grade') {
    const gradeMap = { 'Excellent': 'grade-excellent', 'Good': 'grade-good', 'Average': 'grade-average', 'Needs Improvement': 'grade-poor' };
    return <span className={`rpt-badge ${gradeMap[status] || ''}`}>{status}</span>;
  }
  if (type === 'payment') {
    const pmap = { 'Paid': 'rpt-payment-paid', 'Pending': 'rpt-payment-pending', 'Partial': 'rpt-payment-partial', 'Overdue': 'rpt-payment-overdue' };
    return <span className={`rpt-badge ${pmap[status] || ''}`}>{status}</span>;
  }
  const smap = { 'Completed': 'rpt-status-completed', 'In Progress': 'rpt-status-progress', 'Not Started': 'rpt-status-pending', 'Delayed': 'rpt-status-delayed', 'On Hold': 'rpt-status-onhold', 'Cancelled': 'rpt-status-cancelled', 'Upcoming': 'rpt-status-progress', 'Overdue': 'rpt-status-delayed', 'Pending': 'rpt-status-pending', 'Under Review': 'rpt-status-onhold', 'Reopened': 'rpt-status-delayed' };
  return <span className={`rpt-badge ${smap[status] || ''}`}>{status}</span>;
};

export default ReportStatusBadge;