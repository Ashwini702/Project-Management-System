// src/components/managerReports/ManagerTaskReport.jsx
import React from 'react';
import ManagerReportStatusBadge from './ManagerReportStatusBadge';

const ManagerTaskReport = ({ data }) => {
  const completed = data.filter(t => t.status === 'Completed').length;
  const overdue = data.filter(t => new Date(t.deadline) < new Date() && t.status !== 'Completed').length;
  return (
    <div>
      <div className="report-summary-row">
        <div className="report-summary-card"><h6>Total Tasks</h6><h3>{data.length}</h3></div>
        <div className="report-summary-card"><h6>Completed</h6><h3 className="text-success">{completed}</h3></div>
        <div className="report-summary-card"><h6>Pending</h6><h3 className="text-warning">{data.filter(t => t.status === 'Pending').length}</h3></div>
        <div className="report-summary-card"><h6>Overdue</h6><h3 className="text-danger">{overdue}</h3></div>
      </div>
      <div className="table-responsive">
        <table className="table mrpt-table">
          <thead><tr><th>Task</th><th>Project</th><th>Assignee</th><th>Deadline</th><th>Priority</th><th>Status</th><th>Progress</th><th>Est. Hours</th><th>Spent</th><th>Rate</th></tr></thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id} className={new Date(t.deadline) < new Date() && t.status !== 'Completed' ? 'row-overdue' : ''}>
                <td><span className="mrpt-name">{t.taskName}</span></td><td>{t.projectName}</td><td>{t.assignedTo}</td><td>{t.deadline}</td>
                <td>{t.priority}</td><td><ManagerReportStatusBadge status={t.status} /></td>
                <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${t.progress}%` }}></div></div><small className="ms-2">{t.progress}%</small></td>
                <td>{t.estimatedHours}h</td><td>{t.timeSpent}h</td><td>{t.completionRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManagerTaskReport;