// src/components/clientInvoices/ClientInvoiceCard.jsx
import React from 'react';
import { FiEye, FiDownload, FiMail } from 'react-icons/fi';
import ClientInvoiceStatusBadge from './ClientInvoiceStatusBadge';
import ClientPaymentStatusBadge from './ClientPaymentStatusBadge';

const ClientInvoiceCard = ({ invoice, onView, onDownload, onPay, onMessage }) => (
  <div className={`cinv-card ${invoice.paymentStatus === 'Overdue' ? 'overdue' : ''}`}>
    <div className="cinv-card-header">
      <h6>{invoice.invoiceNumber}</h6>
      <div className="cinv-card-badges">
        <ClientInvoiceStatusBadge status={invoice.invoiceStatus} />
        <ClientPaymentStatusBadge status={invoice.paymentStatus} />
      </div>
    </div>
    <p className="cinv-card-project">{invoice.projectName}</p>
    <div className="cinv-card-dates">
      <span>Issued: {invoice.invoiceDate}</span>
      <span>Due: {invoice.dueDate}</span>
    </div>
    <div className="cinv-card-amounts">
      <div><span>Total</span><strong>₹{invoice.totalAmount.toLocaleString('en-IN')}</strong></div>
      <div><span>Paid</span><strong className="text-success">₹{invoice.paidAmount.toLocaleString('en-IN')}</strong></div>
      <div><span>Pending</span><strong className="text-danger">₹{invoice.pendingAmount.toLocaleString('en-IN')}</strong></div>
    </div>
    <div className="cinv-card-progress">
      <div className="progress"><div className="progress-bar" style={{ width: `${invoice.totalAmount > 0 ? (invoice.paidAmount / invoice.totalAmount) * 100 : 0}%` }}></div></div>
      <small>{invoice.totalAmount > 0 ? Math.round((invoice.paidAmount / invoice.totalAmount) * 100) : 0}% paid</small>
    </div>
    <div className="cinv-card-actions">
      <button className="cinv-btn" onClick={() => onView(invoice)}><FiEye /> View</button>
      <button className="cinv-btn" onClick={() => onDownload(invoice)}><FiDownload /></button>

      <button className="cinv-btn" onClick={() => onMessage(invoice)}><FiMail /></button>
    </div>
  </div>
);
export default ClientInvoiceCard;