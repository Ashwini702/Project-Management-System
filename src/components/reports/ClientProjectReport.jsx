// src/components/reports/ClientProjectReport.jsx
import React from 'react';
import ReportStatusBadge from './ReportStatusBadge';

const ClientProjectReport = ({ data }) => (
  <div>
    <div className="report-summary-row">
      <div className="report-summary-card"><h6>Total Clients</h6><h3>{data.length}</h3></div>
      <div className="report-summary-card"><h6>Avg Satisfaction</h6><h3 className="text-success">{Math.round(data.reduce((s, c) => s + c.satisfaction, 0) / data.length)}%</h3></div>
      <div className="report-summary-card"><h6>Pending Payments</h6><h3 className="text-danger">{data.filter(c => c.paymentStatus !== 'Paid').length}</h3></div>
    </div>
    <div className="table-responsive"><table className="table reports-table"><thead><tr><th>Client</th><th>Company</th><th>Projects</th><th>Payment</th><th>Value</th><th>Satisfaction</th></tr></thead><tbody>
      {data.map(c => (
        <tr key={c.id}>
          <td><span className="rpt-name">{c.name}</span></td><td>{c.company}</td>
          <td>{c.completedProjects}/{c.assignedProjects + c.completedProjects}</td>
          <td><ReportStatusBadge status={c.paymentStatus} type="payment" /></td>
          <td>{c.paidAmount} / {c.totalValue}</td>
          <td><div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${c.satisfaction}%`, backgroundColor: 'var(--success-color)' }}></div></div><small className="ms-2">{c.satisfaction}%</small></td>
        </tr>
      ))}
    </tbody></table></div>
  </div>
);

export default ClientProjectReport;