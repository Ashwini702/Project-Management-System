// src/components/budget/ClientBillingTable.jsx
import React from 'react';
import { FiEye, FiFileText, FiCheck } from 'react-icons/fi';
import PaymentStatusBadge from './PaymentStatusBadge';

const ClientBillingTable = ({ billings, onView, onMarkPaid }) => (
  <div className="table-responsive">
    <table className="table budget-table">
      <thead><tr><th>Client</th><th>Company</th><th>Project</th><th>Value</th><th>Paid</th><th>Pending</th><th>Status</th><th>Invoices</th><th>Last Payment</th><th>Actions</th></tr></thead>
      <tbody>
        {billings.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No billing records</p></td></tr> :
          billings.map(b => (
            <tr key={b.id}>
              <td><span className="bgt-name">{b.clientName}</span></td><td>{b.company}</td><td>{b.project}</td>
              <td><strong>₹{b.projectValue.toLocaleString('en-IN')}</strong></td>
              <td className="text-success">₹{b.paidAmount.toLocaleString('en-IN')}</td>
              <td className="text-danger">₹{b.pendingAmount.toLocaleString('en-IN')}</td>
              <td><PaymentStatusBadge status={b.paymentStatus} /></td><td>{b.invoiceCount}</td><td>{b.lastPaymentDate}</td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(b)}><FiEye /></button>
                <button className="action-btn-icon edit-btn" onClick={() => onView(b)}><FiFileText /></button>
                {b.paymentStatus !== 'Paid' && <button className="action-btn-icon complete-btn" onClick={() => onMarkPaid(b)}><FiCheck /></button>}
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default ClientBillingTable;