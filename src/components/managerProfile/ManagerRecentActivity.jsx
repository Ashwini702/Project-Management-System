// src/components/managerProfile/ManagerRecentActivity.jsx
import React from 'react';
import { FiEdit3, FiUserPlus, FiVideo, FiMessageSquare, FiClock, FiFileText, FiUsers, FiMessageCircle } from 'react-icons/fi';

const iconMap = { status: FiEdit3, task: FiUserPlus, meeting: FiVideo, feedback: FiMessageSquare, deadline: FiClock, report: FiFileText, team: FiUsers, comment: FiMessageCircle };

const ManagerRecentActivity = ({ activities }) => (
  <div className="mp-timeline">
    {activities.map((a, i) => {
      const Icon = iconMap[a.type] || FiEdit3;
      return (
        <div key={a.id} className="mp-tl-item">
          <div className="mp-tl-icon"><Icon /></div>
          {i < activities.length - 1 && <div className="mp-tl-line"></div>}
          <div className="mp-tl-content">
            <h6>{a.title}</h6>
            <p>{a.description}</p>
            <span>{a.relatedTo} • {a.dateTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);
export default ManagerRecentActivity;