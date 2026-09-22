// src/components/clientMessages/ClientMessageAttachmentBox.jsx
import React from 'react';
import { FiDownload, FiEye, FiFile } from 'react-icons/fi';
import { attachments } from '../../data/clientMessagesData';

const ClientMessageAttachmentBox = ({ onAlert }) => (
  <div className="cmsg-attach-box">
    <h6>Recent Attachments</h6>
    {attachments.map(a => (
      <div key={a.id} className="cmsg-attach-item">
        <div className={`cmsg-attach-icon cmsg-attach-${a.fileType.toLowerCase()}`}><FiFile /></div>
        <div className="cmsg-attach-info">
          <strong>{a.fileName}</strong>
          <span>{a.fileSize} • {a.uploadDate} by {a.uploadedBy}</span>
        </div>
        <div className="cmsg-attach-actions">
          <button className="cmsg-btn" onClick={() => onAlert('Preview is demo.')}><FiEye /></button>
          <button className="cmsg-btn" onClick={() => onAlert('Download is demo.')}><FiDownload /></button>
        </div>
      </div>
    ))}
  </div>
);
export default ClientMessageAttachmentBox;