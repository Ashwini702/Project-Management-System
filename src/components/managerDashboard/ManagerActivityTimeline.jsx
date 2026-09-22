// src/components/managerDashboard/ManagerActivityTimeline.jsx
import React from 'react';
import { FiUserPlus, FiCheck, FiEdit3, FiMessageSquare, FiUpload, FiClock } from 'react-icons/fi';

const iconMap = { task: FiUserPlus, complete: FiCheck, status: FiEdit3, feedback: FiMessageSquare, upload: FiUpload, deadline: FiClock };

const ManagerActivityTimeline = ({ activities }) => (
  <div className="mgr-timeline">
    <h6>Recent Activity</h6>
    {activities.map((a, i) => {
      const Icon = iconMap[a.type] || FiEdit3;
      return (
        <div key={a.id} className="mgr-tl-item">
          <div className="mgr-tl-icon"><Icon /></div>
          {i < activities.length - 1 && <div className="mgr-tl-line"></div>}
          <div className="mgr-tl-content">
            <h6>{a.title}</h6><p>{a.description}</p><span>{a.user} • {a.dateTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);
export default ManagerActivityTimeline;