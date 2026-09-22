// src/components/teamProjects/TeamProjectFiles.jsx
import React from 'react';
import { FiEye, FiDownload, FiFile } from 'react-icons/fi';
import { projectFiles } from '../../data/teamProjectsData';

const TeamProjectFiles = ({ projectId, onAlert }) => {
  const files = projectFiles.filter(f => f.projectId === projectId);
  return (
    <div className="tp-files">
      <h6>Project Files ({files.length})</h6>
      {files.map(f => (
        <div key={f.id} className="tp-file-item">
          <div className={`tp-file-icon tp-file-${f.fileType.toLowerCase()}`}><FiFile /></div>
          <div className="tp-file-info">
            <strong>{f.fileName}</strong>
            <span>{f.category} • {f.fileSize} • {f.uploadDate}</span>
            <span>By: {f.uploadedBy}</span>
          </div>
          <div className="tp-file-actions">
            <button className="tp-file-btn" onClick={() => onAlert('Preview is demo.')}><FiEye /></button>
            <button className="tp-file-btn" onClick={() => onAlert('Download is demo.')}><FiDownload /></button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TeamProjectFiles;