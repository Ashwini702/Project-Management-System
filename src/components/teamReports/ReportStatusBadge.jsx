// src/components/teamReports/ReportStatusBadge.jsx
import React from 'react';
const ReportStatusBadge = ({ status, type = 'report' }) => {
  if (type === 'productivity') {
    const pmap = { 'Excellent': 'tdr-prod-excellent', 'Good': 'tdr-prod-good', 'Average': 'tdr-prod-average', 'Low': 'tdr-prod-low' };
    return <span className={`tdr-badge ${pmap[status] || ''}`}>{status}</span>;
  }
  const smap = { 'Draft': 'tdr-status-draft', 'Submitted': 'tdr-status-submitted', 'Under Review': 'tdr-status-review', 'Approved': 'tdr-status-approved', 'Rejected': 'tdr-status-rejected' };
  return <span className={`tdr-badge ${smap[status] || ''}`}>{status}</span>;
};
export default ReportStatusBadge;