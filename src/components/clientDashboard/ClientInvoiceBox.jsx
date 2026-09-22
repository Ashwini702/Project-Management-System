// src/components/clientDashboard/ClientInvoiceBox.jsx
import React, { useEffect, useState } from 'react';
import { FiEye, FiDownload, FiCreditCard } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';
import api, { apiData } from '../../services/api';

const ClientInvoiceBox = ({ onAlert }) => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => { api.get('/invoices').then((response) => setInvoices(apiData(response).map((invoice) => ({ ...invoice, invoiceNumber: invoice.invoice_number || invoice.invoiceNumber || ('Invoice #' + invoice.id), projectName: invoice.project_name || invoice.projectName || 'Project', invoiceDate: invoice.invoice_date || invoice.invoiceDate || '-', dueDate: invoice.due_date || invoice.dueDate || '-', totalAmount: Number(invoice.final_amount ?? invoice.total_amount ?? invoice.totalAmount ?? 0), paidAmount: Number(invoice.paid_amount ?? invoice.paidAmount ?? 0), pendingAmount: Number(invoice.pending_amount ?? invoice.pendingAmount ?? 0), paymentStatus: invoice.payment_status || invoice.paymentStatus || 'Pending' })))).catch(() => setInvoices([])); }, []);
  return (
  <div className="cl-invoice-box">
    <h6>Invoices & Payments</h6>
    <div className="cl-invoices-grid">
      {invoices.map(inv => (
        <div key={inv.id} className="cl-invoice-card">
          <div className="cl-inv-header"><span>{inv.invoiceNumber}</span><ClientStatusBadge status={inv.paymentStatus} type="payment" /></div>
          <p className="cl-inv-project">{inv.projectName}</p>
          <div className="cl-inv-dates"><span>Issued: {inv.invoiceDate}</span><span>Due: {inv.dueDate}</span></div>
          <div className="cl-inv-amounts">
            <div><span>Total</span><strong>₹{inv.totalAmount.toLocaleString('en-IN')}</strong></div>
            <div><span>Paid</span><strong className="text-success">₹{inv.paidAmount.toLocaleString('en-IN')}</strong></div>
            <div><span>Pending</span><strong className="text-danger">₹{inv.pendingAmount.toLocaleString('en-IN')}</strong></div>
          </div>
          <div className="cl-inv-actions">
            <button className="cl-inv-btn" onClick={() => onAlert('Invoice details are available on the Invoices page.')}><FiEye /></button>
            <button className="cl-inv-btn" onClick={() => onAlert('Download is available on the Invoices page.')}><FiDownload /></button>
            <button className="cl-inv-btn pay" onClick={() => onAlert('Payment is available on the Invoices page.')}><FiCreditCard /> Pay</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ClientInvoiceBox;