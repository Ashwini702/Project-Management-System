// src/components/teamReports/DailyReportDetailsModal.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import ReportStatusBadge from './ReportStatusBadge';
import ProductivityProgressBar from './ProductivityProgressBar';

const DailyReportDetailsModal = ({ show, onClose, report }) => {
  if (!show || !report) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{report.reportTitle}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="tdr-detail-badges"><ReportStatusBadge status={report.status} /><ReportStatusBadge status={report.productivityLevel} type="productivity" /></div>
        <div className="tdr-detail-grid mt-3">
          <div><strong>Date:</strong> {report.reportDate}</div><div><strong>Project:</strong> {report.projectName}</div>
          <div><strong>Task:</strong> {report.taskName}</div><div><strong>Type:</strong> {report.workType}</div>
          <div><strong>Status:</strong> {report.taskStatus}</div><div><strong>Progress:</strong> {report.taskProgress}%</div>
          <div><strong>Hours:</strong> {report.totalWorkHours}h</div><div><strong>Productive:</strong> {report.productiveHours}h</div>
        </div>
        <div className="mt-3"><strong>Productivity:</strong> {report.productivityScore}% <ProductivityProgressBar score={report.productivityScore} /></div>
        <div className="mt-3"><strong>Work Summary:</strong><p>{report.workSummary}</p></div>
        <div><strong>Completed:</strong><p>{report.completedWork}</p></div>
        <div><strong>Pending:</strong><p>{report.pendingWork || 'None'}</p></div>
        <div><strong>Blockers:</strong><p>{report.blockers || 'None'}</p></div>
        <div><strong>Tomorrow's Plan:</strong><p>{report.tomorrowPlan || 'N/A'}</p></div>
        <p><strong>Submitted:</strong> {report.submittedTime} {report.reviewedBy && `| Reviewed by: ${report.reviewedBy}`}</p>
        {report.reviewerComment && <p><strong>Reviewer Comment:</strong> {report.reviewerComment}</p>}
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default DailyReportDetailsModal;