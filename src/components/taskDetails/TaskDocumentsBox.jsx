// src/components/taskDetails/TaskDocumentsBox.jsx
import React from 'react';
import { FiDownload, FiTrash2, FiUpload, FiFile } from 'react-icons/fi';
import { taskDocuments } from '../../data/taskDetailsData';

const TaskDocumentsBox = ({ onAlert }) => (
  <div>
    <div className="d-flex justify-content-end mb-3"><button className="btn btn-primary btn-sm" onClick={() => onAlert('Upload is frontend demo only.')}><FiUpload /> Upload</button></div>
    <div className="td-documents-grid">
      {taskDocuments.map(d => (
        <div key={d.id} className="td-doc-card">
          <div className={`doc-icon doc-${d.type.toLowerCase()}`}><FiFile /></div>
          <div className="doc-info"><h6>{d.name}</h6><span>{d.size} • {d.uploadDate}</span><span>By: {d.uploadedBy}</span></div>
          <div className="doc-actions">
            <button className="doc-btn" onClick={() => onAlert('Download is frontend demo only.')}><FiDownload /></button>
            <button className="doc-btn delete" onClick={() => onAlert('Delete is frontend demo only.')}><FiTrash2 /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TaskDocumentsBox;