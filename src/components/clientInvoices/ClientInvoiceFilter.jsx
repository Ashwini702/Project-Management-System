// src/components/clientInvoices/ClientInvoiceFilter.jsx
import React from 'react';
import { FiSearch, FiRotateCcw } from 'react-icons/fi';
import { projects } from '../../data/clientInvoicesData';

const ClientInvoiceFilter = ({ filters, setFilters, onReset }) => (
  <div className="filter-section">
    <div className="filter-row">
      <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search invoices..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /></div>
      <div className="filter-selects">
        <select className="form-select" value={filters.project} onChange={(e) => setFilters({ ...filters, project: e.target.value })}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
        <select className="form-select" value={filters.invoiceStatus} onChange={(e) => setFilters({ ...filters, invoiceStatus: e.target.value })}><option value="All Invoice Status">All Invoice Status</option><option>Generated</option><option>Sent</option><option>Viewed</option><option>Cancelled</option></select>
        <select className="form-select" value={filters.paymentStatus} onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}><option value="All Payment Status">All Payment Status</option><option>Paid</option><option>Pending</option><option>Partial</option><option>Overdue</option></select>
      </div>
      <button className="btn btn-light reset-btn" onClick={onReset}><FiRotateCcw className="me-2" /> Reset</button>
    </div>
  </div>
);
export default ClientInvoiceFilter;