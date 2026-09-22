// src/components/backup/DataExportBox.jsx
import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { exportOptions } from '../../data/backupData';

const DataExportBox = ({ onExport }) => (
  <div className="data-export-box">
    <div className="export-grid">
      {exportOptions.map(opt => (
        <div key={opt.id} className="export-card">
          <h6>{opt.title}</h6>
          <p>{opt.description}</p>
          <div className="export-formats">
            {opt.formats.map(f => <span key={f} className="format-tag">{f}</span>)}
          </div>
          <button className="btn btn-primary btn-sm w-100 mt-3" onClick={() => onExport(opt)}><FiDownload className="me-1" /> Export</button>
        </div>
      ))}
    </div>
  </div>
);

export default DataExportBox;