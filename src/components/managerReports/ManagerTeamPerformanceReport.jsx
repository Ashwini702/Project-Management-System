// src/components/managerReports/ManagerTeamPerformanceReport.jsx
import React from 'react';
import ManagerReportStatusBadge from './ManagerReportStatusBadge';

const ManagerTeamPerformanceReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Avg Productivity</h6><h3>{Math.round(data.reduce((s, e) => s + e.productivity, 0) / data.length)}%</h3></div>
      <div className="report-summary-card"><h6>Excellent</h6><h3 className="text-success">{data.filter(e => e.performanceGrade === 'Excellent').length}</h3></div>
      <div className="report-summary-card"><h6>Avg Workload</h6><h3>{Math.round(data.reduce((s, e) => s + e.workload, 0) / data.length)}%</h3></div>
    </div>
    <div className="table-responsive">
      <table className="table mrpt-table">
        <thead><tr><th>Member</th><th>Role</th><th>Dept</th><th>Tasks</th><th>Done</th><th>Pending</th><th>Overdue</th><th>Workload</th><th>Productivity</th><th>Grade</th></tr></thead>
        <tbody>
          {data.map(e => (
            <tr key={e.id} className={e.workload >= 90 ? 'row-overdue' : ''}>
              <td><span className="mrpt-name">{e.memberName}</span></td><td>{e.role}</td><td>{e.department}</td>
              <td>{e.assignedTasks}</td><td className="text-success">{e.completedTasks}</td><td className="text-warning">{e.pendingTasks}</td>
              <td className="text-danger">{e.overdueTasks}</td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${e.workload}%`, backgroundColor: e.workload >= 90 ? 'var(--danger-color)' : 'var(--primary-color)' }}></div></div><small className="ms-2">{e.workload}%</small></td>
              <td><strong>{e.productivity}%</strong></td>
              <td><ManagerReportStatusBadge status={e.performanceGrade} type="grade" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ManagerTeamPerformanceReport;