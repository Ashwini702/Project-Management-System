// src/components/clientInvoices/ClientInvoiceDetailsModal.jsx
import React from 'react';
import { FiX, FiDownload, FiFolder, FiCalendar } from 'react-icons/fi';
import ClientInvoiceStatusBadge from './ClientInvoiceStatusBadge';
import ClientPaymentStatusBadge from './ClientPaymentStatusBadge';

const ClientInvoiceDetailsModal = ({ show, onClose, invoice, onDownload, onPay, onMessage }) => {
  if (!show || !invoice) return null;
  return (
    <div className="cinv-modal-overlay"><div className="modal-dialog modal-lg cinv-details-dialog"><div className="modal-content cinv-details-modal">
      <div className="modal-header"><h5 className="modal-title">{invoice.invoiceNumber}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="cinv-detail-badges"><ClientInvoiceStatusBadge status={invoice.invoiceStatus} /><ClientPaymentStatusBadge status={invoice.paymentStatus} /></div>
        <div className="cinv-detail-grid mt-3">
          <div><FiFolder /><strong>Project:</strong> {invoice.projectName}</div>
          <div><strong>Client:</strong> {invoice.clientName}</div>
          <div><FiCalendar /><strong>Invoice Date:</strong> {invoice.invoiceDate}</div>
          <div><FiCalendar /><strong>Due Date:</strong> {invoice.dueDate}</div>
          <div><strong>Total:</strong> ₹{invoice.totalAmount.toLocaleString('en-IN')}</div>
          <div><strong>Paid:</strong> ₹{invoice.paidAmount.toLocaleString('en-IN')}</div>
          <div><strong>Pending:</strong> ₹{invoice.pendingAmount.toLocaleString('en-IN')}</div>
          <div><strong>Tax:</strong> ₹{Number(invoice.taxAmount || 0).toLocaleString('en-IN')}</div>
          <div><strong>Discount:</strong> ₹{Number(invoice.discountAmount || 0).toLocaleString('en-IN')}</div>
          <div><strong>Final:</strong> ₹{invoice.finalAmount.toLocaleString('en-IN')}</div>
        </div>
        <p className="mt-3"><strong>Description:</strong> {invoice.description}</p>
        <p><strong>Terms:</strong> {invoice.paymentTerms}</p>
        {invoice.notes && <p><strong>Notes:</strong> {invoice.notes}</p>}
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline-primary btn-sm" onClick={() => onDownload(invoice)}><FiDownload /> Download</button>


        <button className="btn btn-light btn-sm" onClick={onClose}>Close</button>
      </div>
    </div></div></div>
  );
};
export default ClientInvoiceDetailsModal;