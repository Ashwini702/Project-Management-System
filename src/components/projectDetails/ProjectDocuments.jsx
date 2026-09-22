// src/components/projectDetails/ProjectDocuments.jsx
import React from 'react';
import { FiDownload, FiTrash2, FiUpload, FiFile } from 'react-icons/fi';

const ProjectDocuments = ({ documents, onUpload }) => (
  <div>
    <div className="d-flex justify-content-end mb-3"><button className="btn btn-primary btn-sm" onClick={onUpload}><FiUpload /> Upload</button></div>
    <div className="pd-documents-grid">
      {documents.map(d => (
        <div key={d.id} className="pd-doc-card">
          <div className={`doc-icon doc-${d.type.toLowerCase()}`}><FiFile /></div>
          <div className="doc-info">
            <h6>{d.name}</h6>
            <span>{d.size} • {d.uploadDate}</span>
            <span>By: {d.uploadedBy}</span>
          </div>
          <div className="doc-actions">
            <button className="doc-btn"><FiDownload /></button>
            <button className="doc-btn delete"><FiTrash2 /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectDocuments;