// src/components/teamReports/DailyReportTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import ReportStatusBadge from './ReportStatusBadge';

const DailyReportTable = ({ reports, onView, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table tdr-table">
      <thead><tr><th>Report</th><th>Date</th><th>Project</th><th>Task</th><th>Type</th><th>Hours</th><th>Progress</th><th>Prod</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {reports.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No reports found</p></td></tr> :
          reports.map(r => (
            <tr key={r.id}>
              <td><div><span className="tdr-name">{r.reportTitle}</span><small className="d-block text-muted">{r.workSummary.substring(0, 40)}...</small></div></td>
              <td>{r.reportDate}</td><td>{r.projectName}</td><td>{r.taskName}</td><td>{r.workType}</td>
              <td>{r.totalWorkHours}h</td><td>{r.taskProgress}%</td><td>{r.productivityScore}%</td>
              <td><ReportStatusBadge status={r.status} /></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(r)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onEdit(r)}><FiEdit2 /></button>
                <button className="action-btn-icon delete-btn" onClick={() => onDelete(r)}><FiTrash2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default DailyReportTable;