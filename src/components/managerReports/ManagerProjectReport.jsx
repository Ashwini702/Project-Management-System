// src/components/managerReports/ManagerProjectReport.jsx
import React from 'react';
import { FiEye, FiDownload } from 'react-icons/fi';
import ManagerReportStatusBadge from './ManagerReportStatusBadge';

const ManagerProjectReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Active</h6><h3>{data.filter(p => p.status === 'In Progress').length}</h3></div>
      <div className="report-summary-card"><h6>Completed</h6><h3 className="text-success">{data.filter(p => p.status === 'Completed').length}</h3></div>
      <div className="report-summary-card"><h6>Delayed</h6><h3 className="text-danger">{data.filter(p => p.status === 'Delayed' || p.status === 'On Hold').length}</h3></div>
      <div className="report-summary-card"><h6>Avg Progress</h6><h3>{Math.round(data.reduce((s, p) => s + p.progress, 0) / data.length)}%</h3></div>
    </div>
    <div className="table-responsive">
      <table className="table mrpt-table">
        <thead><tr><th>Project</th><th>Client</th><th>Category</th><th>Start</th><th>End</th><th>Status</th><th>Priority</th><th>Progress</th><th>Tasks</th><th>Actions</th></tr></thead>
        <tbody>
          {data.map(p => (
            <tr key={p.id}>
              <td><span className="mrpt-name">{p.projectName}</span></td><td>{p.clientName}</td><td>{p.category}</td><td>{p.startDate}</td><td>{p.endDate}</td>
              <td><ManagerReportStatusBadge status={p.status} /></td><td>{p.priority}</td>
              <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${p.progress}%` }}></div></div><small className="ms-2">{p.progress}%</small></td>
              <td>{p.completedTasks}/{p.totalTasks}</td>
              <td><div className="action-buttons"><button className="action-btn-icon view-btn"><FiEye /></button><button className="action-btn-icon down-btn"><FiDownload /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ManagerProjectReport;