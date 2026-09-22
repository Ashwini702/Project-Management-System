// src/components/reports/ExportButtons.jsx
import React from 'react';
import { FiDownload, FiFileText, FiPrinter } from 'react-icons/fi';

const ExportButtons = ({ onExport }) => (
  <div className="export-buttons">
    <button className="btn btn-sm btn-outline-primary" onClick={() => onExport('PDF')}><FiDownload className="me-1" /> Export PDF</button>
    <button className="btn btn-sm btn-outline-success" onClick={() => onExport('Excel')}><FiFileText className="me-1" /> Export Excel</button>
    <button className="btn btn-sm btn-outline-secondary" onClick={() => onExport('Print')}><FiPrinter className="me-1" /> Print</button>
  </div>
);

export default ExportButtons;