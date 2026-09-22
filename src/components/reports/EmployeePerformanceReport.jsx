// src/components/reports/EmployeePerformanceReport.jsx
import React from 'react';
import ReportStatusBadge from './ReportStatusBadge';

const EmployeePerformanceReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Avg Productivity</h6><h3>{Math.round(data.reduce((s, e) => s + e.productivity, 0) / data.length)}%</h3></div>
      <div className="report-summary-card"><h6>Top Grade</h6><h3 className="text-success">{data.filter(e => e.grade === 'Excellent').length}</h3></div>
      <div className="report-summary-card"><h6>Avg Workload</h6><h3>{Math.round(data.reduce((s, e) => s + e.workload, 0) / data.length)}%</h3></div>
    </div>
    <div className="table-responsive"><table className="table reports-table"><thead><tr><th>Employee</th><th>Department</th><th>Role</th><th>Tasks</th><th>Productivity</th><th>Workload</th><th>Grade</th></tr></thead><tbody>
      {data.map(e => (
        <tr key={e.id}>
          <td><span className="rpt-name">{e.name}</span></td><td>{e.department}</td><td>{e.role}</td>
          <td>{e.completedTasks}/{e.assignedTasks} <small>({e.pendingTasks} pending)</small></td>
          <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${e.productivity}%`, backgroundColor: 'var(--success-color)' }}></div></div><small className="ms-2">{e.productivity}%</small></td>
          <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${e.workload}%`, backgroundColor: e.workload >= 90 ? 'var(--danger-color)' : 'var(--primary-color)' }}></div></div><small className="ms-2">{e.workload}%</small></td>
          <td><ReportStatusBadge status={e.grade} type="grade" /></td>
        </tr>
      ))}
    </tbody></table></div>
  </div>
);

export default EmployeePerformanceReport;