// src/components/clientProfile/ClientRecentActivity.jsx
import React from 'react';
import { FiMessageSquare, FiFile, FiFileText, FiDollarSign, FiMail, FiFolder, FiDownload, FiUser } from 'react-icons/fi';

const iconMap = { feedback: FiMessageSquare, file: FiFile, invoice: FiFileText, payment: FiDollarSign, message: FiMail, project: FiFolder, download: FiDownload, profile: FiUser };

const ClientRecentActivity = ({ activities }) => (
  <div className="cprof-timeline">
    {activities.map((a, i) => {
      const Icon = iconMap[a.type] || FiFile;
      return (
        <div key={a.id} className="cprof-tl-item">
          <div className="cprof-tl-icon"><Icon /></div>
          {i < activities.length - 1 && <div className="cprof-tl-line"></div>}
          <div className="cprof-tl-content">
            <h6>{a.title}</h6>
            <p>{a.description}</p>
            <span>{a.relatedTo} • {a.dateTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);
export default ClientRecentActivity;