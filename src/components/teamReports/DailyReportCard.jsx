// src/components/teamReports/DailyReportCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiClock, FiFolder } from 'react-icons/fi';
import ReportStatusBadge from './ReportStatusBadge';
import ProductivityProgressBar from './ProductivityProgressBar';

const DailyReportCard = ({ report, onView, onEdit, onDelete }) => (
  <div className="tdr-card">
    <div className="tdr-card-header">
      <h6>{report.reportTitle}</h6>
      <ReportStatusBadge status={report.status} />
    </div>
    <div className="tdr-card-meta">
      <span><FiClock /> {report.reportDate}</span>
      <span><FiFolder /> {report.projectName}</span>
      <span>{report.workType}</span>
    </div>
    <p className="tdr-card-summary">{report.workSummary}</p>
    <div className="tdr-card-hours">
      <span>Hours: {report.totalWorkHours}h</span>
      <span>Productive: {report.productiveHours}h</span>
      <span>Progress: {report.taskProgress}%</span>
    </div>
    <div className="tdr-card-prod">
      <div className="tdr-prod-label"><span>Productivity</span><strong>{report.productivityScore}%</strong></div>
      <ProductivityProgressBar score={report.productivityScore} />
      <ReportStatusBadge status={report.productivityLevel} type="productivity" />
    </div>
    <div className="tdr-card-actions">
      <button className="tdr-btn" onClick={() => onView(report)}><FiEye /></button>
      <button className="tdr-btn" onClick={() => onEdit(report)}><FiEdit2 /></button>
      <button className="tdr-btn delete" onClick={() => onDelete(report)}><FiTrash2 /></button>
    </div>
  </div>
);
export default DailyReportCard;