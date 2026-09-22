// src/components/budget/InvoiceCard.jsx
import React from 'react';
import { FiEye, FiDownload, FiSend, FiTrash2 } from 'react-icons/fi';
import PaymentStatusBadge from './PaymentStatusBadge';

const InvoiceCard = ({ invoice, onView, onAction }) => (
  <div className="invoice-card">
    <div className="inv-header">
      <h6>{invoice.invoiceNumber}</h6>
      <PaymentStatusBadge status={invoice.paymentStatus} />
    </div>
    <div className="inv-body">
      <p><strong>{invoice.clientName}</strong></p>
      <p className="inv-project">{invoice.projectName}</p>
      <div className="inv-dates"><span>Issued: {invoice.invoiceDate}</span><span>Due: {invoice.dueDate}</span></div>
      <div className="inv-amounts">
        <div><span>Total</span><strong>₹{invoice.totalAmount.toLocaleString('en-IN')}</strong></div>
        <div><span>Paid</span><strong className="text-success">₹{invoice.paidAmount.toLocaleString('en-IN')}</strong></div>
        <div><span>Pending</span><strong className="text-danger">₹{invoice.pendingAmount.toLocaleString('en-IN')}</strong></div>
      </div>
    </div>
    <div className="inv-actions">
      <button className="inv-btn" onClick={() => onView(invoice)}><FiEye /></button>
      <button className="inv-btn" onClick={() => onAction(invoice, 'Download')}><FiDownload /></button>
      <button className="inv-btn" onClick={() => onAction(invoice, 'Send')}><FiSend /></button>
      <button className="inv-btn" onClick={() => onAction(invoice, 'Delete')}><FiTrash2 /></button>
    </div>
  </div>
);

export default InvoiceCard;