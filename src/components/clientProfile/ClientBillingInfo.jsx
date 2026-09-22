// src/components/clientProfile/ClientBillingInfo.jsx
import React from 'react';
import ClientStatusBadge from './ClientStatusBadge';

const ClientBillingInfo = ({ billing, invoices }) => (
  <div>
    <div className="cprof-info-card mb-3">
      <h6>Billing Details</h6>
      <div className="cprof-info-grid">
        <div><span>Name:</span><strong>{billing.billingName}</strong></div>
        <div><span>Email:</span><strong>{billing.billingEmail}</strong></div>
        <div><span>Phone:</span><strong>{billing.billingPhone}</strong></div>
        <div><span>Address:</span><strong>{billing.billingAddress}</strong></div>
        <div><span>GST:</span><strong>{billing.gstNumber}</strong></div>
        <div><span>PAN:</span><strong>{billing.panNumber}</strong></div>
      </div>
    </div>
    <div className="cprof-billing-summary">
      <div className="cprof-bs-item"><span>Total Invoiced</span><strong>₹{billing.totalInvoiceAmount.toLocaleString('en-IN')}</strong></div>
      <div className="cprof-bs-item"><span>Total Paid</span><strong className="text-success">₹{billing.totalPaidAmount.toLocaleString('en-IN')}</strong></div>
      <div className="cprof-bs-item"><span>Total Pending</span><strong className="text-danger">₹{billing.totalPendingAmount.toLocaleString('en-IN')}</strong></div>
      <div className="cprof-bs-item"><span>Overdue</span><strong className="text-danger">₹{billing.overdueAmount.toLocaleString('en-IN')}</strong></div>
    </div>
    <h6 className="mt-3">Recent Invoices</h6>
    <div className="table-responsive">
      <table className="table cprof-table">
        <thead><tr><th>Invoice</th><th>Project</th><th>Amount</th><th>Status</th><th>Due Date</th></tr></thead>
        <tbody>{invoices.map(inv => <tr key={inv.id}><td>{inv.invoiceNumber}</td><td>{inv.projectName}</td><td>₹{inv.amount.toLocaleString('en-IN')}</td><td><ClientStatusBadge status={inv.paymentStatus} type="payment" /></td><td>{inv.dueDate}</td></tr>)}</tbody>
      </table>
    </div>
  </div>
);
export default ClientBillingInfo;