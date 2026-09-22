// src/components/clientInvoices/ClientPaymentStatusBadge.jsx
import React from 'react';
const ClientPaymentStatusBadge = ({ status }) => {
  const map = { 'Paid': 'cinv-pay-paid', 'Pending': 'cinv-pay-pending', 'Partial': 'cinv-pay-partial', 'Overdue': 'cinv-pay-overdue' };
  return <span className={`cinv-badge ${map[status] || ''}`}>{status}</span>;
};
export default ClientPaymentStatusBadge;