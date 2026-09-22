// src/components/clients/ClientBillingBox.jsx
import React from 'react';

const ClientBillingBox = ({ client }) => {
  const paymentPercent = client.projectValue > 0 ? Math.round((client.paidAmount / client.projectValue) * 100) : 0;
  const getPaymentColor = () => {
    if (client.paymentStatus === 'Paid') return 'var(--success-color)';
    if (client.paymentStatus === 'Partial') return 'var(--primary-color)';
    if (client.paymentStatus === 'Overdue') return 'var(--danger-color)';
    return 'var(--warning-color)';
  };

  return (
    <div className="client-billing-box">
      <h6>Billing Summary</h6>
      <div className="billing-grid">
        <div className="billing-item"><span>Total Value</span><strong>₹{client.projectValue.toLocaleString('en-IN')}</strong></div>
        <div className="billing-item"><span>Paid</span><strong className="text-success">₹{client.paidAmount.toLocaleString('en-IN')}</strong></div>
        <div className="billing-item"><span>Pending</span><strong className="text-danger">₹{client.pendingAmount.toLocaleString('en-IN')}</strong></div>
      </div>
      <div className="progress billing-progress"><div className="progress-bar" style={{ width: `${paymentPercent}%`, backgroundColor: getPaymentColor() }}></div></div>
      <div className="billing-footer"><span>Payment: {paymentPercent}%</span><span className={`payment-label payment-${client.paymentStatus.toLowerCase()}`}>{client.paymentStatus}</span></div>
    </div>
  );
};

export default ClientBillingBox;