// src/components/managerReports/ManagerClientFeedbackReport.jsx
import React from 'react';
import { FiStar } from 'react-icons/fi';
import ManagerReportStatusBadge from './ManagerReportStatusBadge';

const ManagerClientFeedbackReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Total Feedback</h6><h3>{data.length}</h3></div>
      <div className="report-summary-card"><h6>Pending</h6><h3 className="text-warning">{data.filter(f => f.status === 'Pending' || f.status === 'In Review').length}</h3></div>
      <div className="report-summary-card"><h6>Resolved</h6><h3 className="text-success">{data.filter(f => f.status === 'Resolved' || f.status === 'Approved').length}</h3></div>
      <div className="report-summary-card"><h6>Avg Rating</h6><h3>{(data.reduce((s, f) => s + f.rating, 0) / data.length).toFixed(1)}</h3></div>
    </div>
    <div className="table-responsive">
      <table className="table mrpt-table">
        <thead><tr><th>Title</th><th>Client</th><th>Company</th><th>Project</th><th>Category</th><th>Priority</th><th>Status</th><th>Rating</th><th>Submitted</th><th>Resolved</th></tr></thead>
        <tbody>
          {data.map(f => (
            <tr key={f.id}>
              <td><span className="mrpt-name">{f.title}</span></td><td>{f.clientName}</td><td>{f.companyName}</td><td>{f.projectName}</td>
              <td>{f.category}</td><td>{f.priority}</td><td><ManagerReportStatusBadge status={f.status} /></td>
              <td><span className="mrpt-rating">{[...Array(5)].map((_, i) => <FiStar key={i} className={i < f.rating ? 'filled' : ''} />)}</span></td>
              <td>{f.submittedDate}</td><td>{f.resolvedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ManagerClientFeedbackReport;