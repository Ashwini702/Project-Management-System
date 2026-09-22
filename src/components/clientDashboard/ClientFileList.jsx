// src/components/clientDashboard/ClientFileList.jsx
import React, { useEffect, useState } from 'react';
import { FiDownload, FiEye, FiFile } from 'react-icons/fi';
import * as documentService from '../../services/documentService';
import { apiData } from '../../services/api';

const formatSize = (bytes) => {
  const value = Number(bytes || 0);
  if (!value) return '—';
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
};
const typeFrom = (file) => (file.file_name || '').split('.').pop()?.toUpperCase() || 'FILE';

const ClientFileList = ({ onAlert }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    documentService.getDocuments()
      .then((response) => setFiles(apiData(response)))
      .catch((error) => onAlert(error.response?.data?.message || 'Unable to load shared files.', 'danger'))
      .finally(() => setLoading(false));
  }, []);

  const getFile = async (file, download) => {
    setBusyId(file.id);
    const previewWindow = download ? null : window.open('', '_blank');
    try {
      const response = await documentService.getDocumentFile(file.id, download);
      const url = URL.createObjectURL(response.data);
      if (download) {
        const link = document.createElement('a');
        link.href = url;
        link.download = file.file_name || 'document';
        document.body.appendChild(link); link.click(); link.remove();
      } else if (previewWindow) {
        previewWindow.location.href = url;
      } else {
        window.open(url, '_blank');
      }
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      previewWindow?.close();
      onAlert(error.response?.data?.message || 'Unable to access this file.', 'danger');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="cl-file-list">
      <h6>Shared Files</h6>
      <div className="cl-files-grid">
        {loading ? <p className="text-muted small">Loading shared files…</p> : files.length === 0 ? <p className="text-muted small">No files have been shared with this client yet.</p> : files.map((file) => (
          <div key={file.id} className="cl-file-card">
            <div className={`cl-file-icon cl-file-${typeFrom(file).toLowerCase()}`}><FiFile /></div>
            <div className="cl-file-info"><h6>{file.file_name}</h6><span>{formatSize(file.file_size)} • {String(file.created_at || '').slice(0, 10)}</span><span>Shared project file</span></div>
            <div className="cl-file-actions">
              <button type="button" className="cl-file-btn" title="Preview" disabled={busyId === file.id} onClick={() => getFile(file, false)}><FiEye /></button>
              <button type="button" className="cl-file-btn" title="Download" disabled={busyId === file.id} onClick={() => getFile(file, true)}><FiDownload /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientFileList;