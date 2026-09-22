// src/components/managerReports/ManagerDeadlineReport.jsx
import React from 'react';
import ManagerReportStatusBadge from './ManagerReportStatusBadge';

const ManagerDeadlineReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Upcoming</h6><h3>{data.filter(d => d.status === 'Upcoming').length}</h3></div>
      <div className="report-summary-card"><h6>Overdue</h6><h3 className="text-danger">{data.filter(d => d.status === 'Overdue').length}</h3></div>
      <div className="report-summary-card"><h6>Completed</h6><h3 className="text-success">{data.filter(d => d.status === 'Completed').length}</h3></div>
    </div>
    <div className="table-responsive">
      <table className="table mrpt-table">
        <thead><tr><th>Title</th><th>Type</th><th>Project</th><th>Assignee</th><th>Due Date</th><th>Days</th><th>Priority</th><th>Status</th><th>Progress</th></tr></thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id} className={d.status === 'Overdue' ? 'row-overdue' : ''}>
              <td><span className="mrpt-name">{d.title}</span></td><td>{d.type}</td><td>{d.projectName}</td><td>{d.assignedTo}</td><td>{d.dueDate}</td>
              <td><span className={d.daysRemaining < 0 ? 'text-danger fw-bold' : d.daysRemaining <= 1 ? 'text-warning fw-bold' : ''}>{d.daysRemaining < 0 ? `${Math.abs(d.daysRemaining)}d over` : `${d.daysRemaining}d`}</span></td>
              <td>{d.priority}</td><td><ManagerReportStatusBadge status={d.status} /></td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${d.progress}%` }}></div></div><small className="ms-2">{d.progress}%</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ManagerDeadlineReport;