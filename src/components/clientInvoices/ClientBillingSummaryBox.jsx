// src/components/clientInvoices/ClientBillingSummaryBox.jsx
import React from 'react';
import ClientPaymentStatusBadge from './ClientPaymentStatusBadge';

const ClientBillingSummaryBox = ({ invoices = [] }) => {
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + Number(invoice.finalAmount ?? invoice.totalAmount ?? 0), 0);
  const totalPaid = invoices.reduce((sum, invoice) => sum + Number(invoice.paidAmount ?? 0), 0);
  const totalPending = Math.max(totalInvoiced - totalPaid, 0);
  const billingSummary = { totalProjectValue: totalInvoiced, totalInvoiced, totalPaid, totalPending, overdueAmount: invoices.filter((invoice) => invoice.paymentStatus === "Overdue").reduce((sum, invoice) => sum + Number(invoice.pendingAmount ?? 0), 0), completionPercentage: totalInvoiced ? Math.round((totalPaid / totalInvoiced) * 100) : 0 };
  const projectBillingSummary = [];
  return (
  <div>
    <div className="cinv-billing-summary">
      <div className="cinv-bs-card"><h6>Total Project Value</h6><h3>₹{billingSummary.totalProjectValue.toLocaleString('en-IN')}</h3></div>
      <div className="cinv-bs-card"><h6>Total Invoiced</h6><h3>₹{billingSummary.totalInvoiced.toLocaleString('en-IN')}</h3></div>
      <div className="cinv-bs-card"><h6>Total Paid</h6><h3 className="text-success">₹{billingSummary.totalPaid.toLocaleString('en-IN')}</h3></div>
      <div className="cinv-bs-card"><h6>Total Pending</h6><h3 className="text-danger">₹{billingSummary.totalPending.toLocaleString('en-IN')}</h3></div>
      <div className="cinv-bs-card"><h6>Overdue</h6><h3 className="text-danger">₹{billingSummary.overdueAmount.toLocaleString('en-IN')}</h3></div>
      <div className="cinv-bs-card"><h6>Completion</h6><h3>{billingSummary.completionPercentage}%</h3></div>
    </div>
    <h6 className="mt-4">Project-wise Billing</h6>
    {projectBillingSummary.map(p => (
      <div key={p.projectName} className="cinv-proj-billing">
        <div className="cinv-pb-header">
          <span>{p.projectName}</span>
          <ClientPaymentStatusBadge status={p.paymentStatus} />
        </div>
        <div className="cinv-pb-amounts">
          <span>Total: ₹{p.totalValue.toLocaleString('en-IN')}</span>
          <span className="text-success">Paid: ₹{p.paid.toLocaleString('en-IN')}</span>
          <span className="text-danger">Pending: ₹{p.pending.toLocaleString('en-IN')}</span>
        </div>
        <div className="progress"><div className="progress-bar" style={{ width: `${p.totalValue > 0 ? (p.paid / p.totalValue) * 100 : 0}%` }}></div></div>
      </div>
    ))}
  </div>
  );
};
export default ClientBillingSummaryBox;