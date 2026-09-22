import React from 'react';

const ClientStatusBadge = ({ status, type = 'status' }) => {
  const statusClassMap = {
    Active: 'client-status-active',
    Inactive: 'client-status-inactive',
    Pending: 'client-status-pending',
    Verified: 'client-status-verified'
  };

  const paymentClassMap = {
    Paid: 'payment-paid',
    Pending: 'payment-pending',
    Partial: 'payment-partial',
    Overdue: 'payment-overdue'
  };

  const className =
    type === 'payment'
      ? paymentClassMap[status]
      : statusClassMap[status];

  return (
    <span className={`client-status-badge ${className || ''}`}>
      {status}
    </span>
  );
};

export default ClientStatusBadge;
