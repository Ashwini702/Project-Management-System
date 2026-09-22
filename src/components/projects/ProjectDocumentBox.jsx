// src/components/projects/ProjectDocumentBox.jsx
import React from 'react';
import { FiFile, FiDownload, FiTrash2 } from 'react-icons/fi';

const ProjectDocumentBox = ({ documents }) => {
  const getFileIcon = (type) => {
    const iconMap = {
      pdf: 'file-pdf',
      docx: 'file-doc',
      fig: 'file-design',
      xlsx: 'file-excel',
      png: 'file-image'
    };
    return iconMap[type] || 'file-default';
  };

  return (
    <div className="project-documents">
      {documents.map((doc) => (
        <div key={doc.id} className="document-item">
          <div className={`document-icon ${getFileIcon(doc.type)}`}>
            <FiFile />
          </div>
          <div className="document-info">
            <h6 className="document-name">{doc.name}</h6>
            <span className="document-meta">{doc.size} • {doc.uploadDate}</span>
          </div>
          <div className="document-actions">
            <button className="doc-action-btn download" title="Download">
              <FiDownload />
            </button>
            <button className="doc-action-btn delete" title="Delete">
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectDocumentBox;