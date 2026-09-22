// src/components/reports/DeadlineReport.jsx
import React from 'react';
import ReportStatusBadge from './ReportStatusBadge';

const DeadlineReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Upcoming</h6><h3>{data.filter(d => d.status === 'Upcoming').length}</h3></div>
      <div className="report-summary-card"><h6>Overdue</h6><h3 className="text-danger">{data.filter(d => d.status === 'Overdue').length}</h3></div>
      <div className="report-summary-card"><h6>Completed</h6><h3 className="text-success">{data.filter(d => d.status === 'Completed').length}</h3></div>
    </div>
    <div className="table-responsive"><table className="table reports-table"><thead><tr><th>Title</th><th>Type</th><th>Project</th><th>Assignee</th><th>Due Date</th><th>Days Left</th><th>Priority</th><th>Status</th></tr></thead><tbody>
      {data.map(d => (
        <tr key={d.id} className={d.status === 'Overdue' ? 'row-overdue' : ''}>
          <td><span className="rpt-name">{d.title}</span></td><td>{d.type}</td><td>{d.project}</td><td>{d.assignedTo}</td><td>{d.dueDate}</td>
          <td><span className={d.daysLeft < 0 ? 'text-danger fw-bold' : d.daysLeft <= 2 ? 'text-warning fw-bold' : ''}>{d.daysLeft < 0 ? `${Math.abs(d.daysLeft)}d overdue` : `${d.daysLeft}d`}</span></td>
          <td>{d.priority}</td><td><ReportStatusBadge status={d.status} /></td>
        </tr>
      ))}
    </tbody></table></div>
  </div>
);

export default DeadlineReport;
