// src/components/clientInvoices/ClientPaymentHistory.jsx
import React, { useEffect, useState } from 'react';
import api, { apiData } from '../../services/api';
import { FiDownload } from 'react-icons/fi';
import ClientPaymentStatusBadge from './ClientPaymentStatusBadge';

const ClientPaymentHistory = ({ onAlert }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  useEffect(() => { api.get('/payments').then((response) => setPaymentHistory(apiData(response))).catch(() => setPaymentHistory([])); }, []);
  return (
  <div className="cinv-payment-history">
    <h6>Payment History</h6>
    <div className="table-responsive">
      <table className="table cinv-table">
        <thead><tr><th>Payment ID</th><th>Invoice</th><th>Project</th><th>Date</th><th>Method</th><th>Amount</th><th>Transaction ID</th><th>Status</th><th>Receipt</th></tr></thead>
        <tbody>{paymentHistory.length === 0 ? <tr><td colSpan="9" className="text-center text-muted py-4">No payment history found.</td></tr> : null}
          {paymentHistory.map(p => (
            <tr key={p.id}>
              <td>{p.paymentId}</td><td>{p.invoiceNumber}</td><td>{p.projectName}</td>
              <td>{p.paymentDate}</td><td>{p.paymentMethod}</td>
              <td><strong>₹{p.paidAmount.toLocaleString('en-IN')}</strong></td>
              <td><code>{p.transactionId}</code></td>
              <td><ClientPaymentStatusBadge status={p.status === 'Completed' ? 'Paid' : 'Partial'} /></td>
              <td><button className="action-btn-icon down-btn" onClick={() => onAlert('Receipt download is frontend demo.')}><FiDownload /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};
export default ClientPaymentHistory;