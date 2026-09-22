// src/components/clientInvoices/ClientInvoiceTable.jsx
import React from 'react';
import { FiEye, FiDownload, FiMail } from 'react-icons/fi';
import ClientInvoiceStatusBadge from './ClientInvoiceStatusBadge';
import ClientPaymentStatusBadge from './ClientPaymentStatusBadge';

const ClientInvoiceTable = ({ invoices, onView, onDownload, onPay, onMessage }) => (
  <div className="table-responsive">
    <table className="table cinv-table">
      <thead><tr><th>Invoice No.</th><th>Project</th><th>Invoice Date</th><th>Due Date</th><th>Total</th><th>Paid</th><th>Pending</th><th>Inv Status</th><th>Pay Status</th><th>Actions</th></tr></thead>
      <tbody>
        {invoices.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No invoices found</p></td></tr> :
          invoices.map(inv => (
            <tr key={inv.id} className={inv.paymentStatus === 'Overdue' ? 'row-overdue' : ''}>
              <td><span className="cinv-name">{inv.invoiceNumber}</span></td><td>{inv.projectName}</td>
              <td>{inv.invoiceDate}</td><td>{inv.dueDate}</td>
              <td><strong>₹{inv.totalAmount.toLocaleString('en-IN')}</strong></td>
              <td className="text-success">₹{inv.paidAmount.toLocaleString('en-IN')}</td>
              <td className="text-danger">₹{inv.pendingAmount.toLocaleString('en-IN')}</td>
              <td><ClientInvoiceStatusBadge status={inv.invoiceStatus} /></td>
              <td><ClientPaymentStatusBadge status={inv.paymentStatus} /></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(inv)}><FiEye /></button>
                <button className="action-btn-icon down-btn" onClick={() => onDownload(inv)}><FiDownload /></button>

                <button className="action-btn-icon msg-btn" onClick={() => onMessage(inv)}><FiMail /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default ClientInvoiceTable;