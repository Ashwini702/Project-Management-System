// src/components/reports/ProjectReport.jsx
import React from 'react';
import { FiEye } from 'react-icons/fi';
import ReportStatusBadge from './ReportStatusBadge';

const ProjectReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Active Projects</h6><h3>{data.filter(p => p.status === 'In Progress').length}</h3></div>
      <div className="report-summary-card"><h6>Completed</h6><h3>{data.filter(p => p.status === 'Completed').length}</h3></div>
      <div className="report-summary-card"><h6>Delayed</h6><h3 className="text-danger">{data.filter(p => p.status === 'Delayed').length}</h3></div>
      <div className="report-summary-card"><h6>Avg Progress</h6><h3>{Math.round(data.reduce((s, p) => s + p.progress, 0) / data.length)}%</h3></div>
    </div>
    <div className="table-responsive"><table className="table reports-table"><thead><tr><th>Project</th><th>Client</th><th>Manager</th><th>Timeline</th><th>Status</th><th>Priority</th><th>Progress</th><th>Budget</th><th>Tasks</th><th>Action</th></tr></thead><tbody>
      {data.map(p => (
        <tr key={p.id}>
          <td><span className="rpt-name">{p.name}</span></td><td>{p.client}</td><td>{p.manager}</td><td>{p.startDate} - {p.endDate}</td>
          <td><ReportStatusBadge status={p.status} /></td><td>{p.priority}</td>
          <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${p.progress}%`, backgroundColor: p.progress >= 100 ? 'var(--success-color)' : p.progress >= 50 ? 'var(--primary-color)' : 'var(--warning-color)' }}></div></div><small className="ms-2">{p.progress}%</small></td>
          <td>{p.budget}</td><td>{p.completedTasks}/{p.tasks}</td>
          <td><button className="action-btn-icon view-btn"><FiEye /></button></td>
        </tr>
      ))}
    </tbody></table></div>
  </div>
);

export default ProjectReport;