// src/components/clientMessages/ClientMessageTypeBadge.jsx
import React from 'react';
const ClientMessageTypeBadge = ({ type }) => {
  const map = { 'Project Update': 'cmsg-type-project', 'Feedback Reply': 'cmsg-type-feedback', 'File Discussion': 'cmsg-type-file', 'Invoice Message': 'cmsg-type-invoice', 'Support Message': 'cmsg-type-support', 'Approval Request': 'cmsg-type-approval', 'General Message': 'cmsg-type-general' };
  return <span className={`cmsg-badge ${map[type] || ''}`}>{type}</span>;
};
export default ClientMessageTypeBadge;