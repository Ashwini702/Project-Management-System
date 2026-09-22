// src/components/clientInvoices/ClientInvoiceStatusBadge.jsx
import React from 'react';
const ClientInvoiceStatusBadge = ({ status }) => {
  const map = { 'Generated': 'cinv-status-generated', 'Sent': 'cinv-status-sent', 'Viewed': 'cinv-status-viewed', 'Cancelled': 'cinv-status-cancelled' };
  return <span className={`cinv-badge ${map[status] || ''}`}>{status}</span>;
};
export default ClientInvoiceStatusBadge;