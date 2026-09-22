// src/components/clientInvoices/ClientInvoiceStatsCard.jsx
import React from 'react';
import { FiFileText, FiCheckCircle, FiClock, FiAlertTriangle, FiDollarSign, FiTrendingDown } from 'react-icons/fi';
const iconMap = { FiFileText, FiCheckCircle, FiClock, FiAlertTriangle, FiDollarSign, FiTrendingDown };

const ClientInvoiceStatsCard = ({ stat }) => {
  const cmap = { primary: 'cinv-stat-primary', success: 'cinv-stat-success', warning: 'cinv-stat-warning', danger: 'cinv-stat-danger', info: 'cinv-stat-info', purple: 'cinv-stat-purple' };
  const Icon = iconMap[stat.icon];
  return (
    <div className={`cinv-stat-card ${cmap[stat.color]}`}>
      <div className="cinv-stat-content">
        <div className="cinv-stat-icon-wrapper"><Icon className="cinv-stat-icon" /></div>
        <div className="cinv-stat-info"><h3>{stat.value}</h3><p>{stat.title}</p><span>{stat.desc}</span></div>
      </div>
    </div>
  );
};
export default ClientInvoiceStatsCard;