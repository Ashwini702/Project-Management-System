// src/components/reports/ReportFilter.jsx
import React from 'react';
import { FiSearch, FiRotateCcw } from 'react-icons/fi';
import { reportTypes, dateRanges, projects, departments, statuses, priorities } from '../../data/reportData';

const ReportFilter = ({ filters, setFilters, onReset }) => (
  <div className="report-filter-section">
    <div className="filter-row">
      <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search reports..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} /></div>
      <div className="filter-selects">
        <select className="form-select" value={filters.reportType} onChange={(e) => setFilters({ ...filters, reportType: e.target.value })}><option value="All Reports">All Reports</option>{reportTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
        <select className="form-select" value={filters.dateRange} onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}>{dateRanges.map(d => <option key={d} value={d}>{d}</option>)}</select>
        <select className="form-select" value={filters.project} onChange={(e) => setFilters({ ...filters, project: e.target.value })}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
        <select className="form-select" value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}><option value="All Departments">All Departments</option>{departments.map(d => <option key={d} value={d}>{d}</option>)}</select>
        <select className="form-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="All Status">All Status</option>{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
        <select className="form-select" value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}><option value="All Priority">All Priority</option>{priorities.map(p => <option key={p} value={p}>{p}</option>)}</select>
      </div>
      <button className="btn btn-light reset-btn" onClick={onReset}><FiRotateCcw className="me-2" /> Reset</button>
    </div>
  </div>
);

export default ReportFilter;