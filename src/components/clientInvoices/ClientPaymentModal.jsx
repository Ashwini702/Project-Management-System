// src/components/clientInvoices/ClientPaymentModal.jsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const ClientPaymentModal = ({ show, onClose, invoice, onSubmit }) => {
  const [form, setForm] = useState({ amount: invoice?.pendingAmount || 0, method: 'Bank Transfer', transactionId: '', note: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.amount || form.amount <= 0) e.amount = 'Valid amount required';
    if (!form.method) e.method = 'Method is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(invoice.id, form.amount); };

  if (!show || !invoice) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Pay Invoice - {invoice.invoiceNumber}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Invoice</label><input type="text" className="form-control" value={invoice.invoiceNumber} readOnly /></div>
        <div className="mb-3"><label className="form-label">Project</label><input type="text" className="form-control" value={invoice.projectName} readOnly /></div>
        <div className="mb-3"><label className="form-label">Pending Amount</label><input type="text" className="form-control" value={`₹${invoice.pendingAmount.toLocaleString('en-IN')}`} readOnly /></div>
        <div className="mb-3"><label className="form-label">Payment Amount *</label><input type="number" className={`form-control ${errors.amount ? 'is-invalid' : ''}`} value={form.amount} onChange={(e) => setForm(p => ({ ...p, amount: Number(e.target.value) }))} />{errors.amount && <div className="invalid-feedback">{errors.amount}</div>}</div>
        <div className="mb-3"><label className="form-label">Payment Method *</label><select className={`form-select ${errors.method ? 'is-invalid' : ''}`} value={form.method} onChange={(e) => setForm(p => ({ ...p, method: e.target.value }))}><option>Bank Transfer</option><option>UPI</option><option>Card</option><option>Cash</option><option>Cheque</option></select>{errors.method && <div className="invalid-feedback">{errors.method}</div>}</div>
        <div className="mb-3"><label className="form-label">Transaction ID</label><input type="text" className="form-control" value={form.transactionId} onChange={(e) => setForm(p => ({ ...p, transactionId: e.target.value }))} /></div>
        <div className="mb-3"><label className="form-label">Note</label><textarea className="form-control" rows="2" value={form.note} onChange={(e) => setForm(p => ({ ...p, note: e.target.value }))}></textarea></div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Submit Payment</button></div></form>
    </div></div></div>
  );
};
export default ClientPaymentModal;
