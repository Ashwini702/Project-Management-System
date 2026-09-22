// src/components/budget/PaymentStatusBadge.jsx
import React from 'react';

const PaymentStatusBadge = ({ status, type = 'payment' }) => {
  if (type === 'budget') {
    const bmap = { 'Under Budget': 'bgt-under', 'Near Limit': 'bgt-near', 'Over Budget': 'bgt-over', 'Profitable': 'bgt-profit', 'Loss': 'bgt-loss' };
    return <span className={`budget-status-badge ${bmap[status] || ''}`}>{status}</span>;
  }
  const pmap = { 'Paid': 'bgt-paid', 'Pending': 'bgt-pending', 'Partial': 'bgt-partial', 'Overdue': 'bgt-overdue' };
  return <span className={`budget-status-badge ${pmap[status] || ''}`}>{status}</span>;
};

export default PaymentStatusBadge;