// src/components/teamProfile/TeamRecentActivity.jsx
import React from 'react';
import { FiCheck, FiEdit3, FiCalendar, FiFolder, FiMessageSquare, FiBell } from 'react-icons/fi';
import { recentActivities } from '../../data/teamProfileData';

const iconMap = { task: FiCheck, report: FiEdit3, attendance: FiCalendar, project: FiFolder, comment: FiMessageSquare, notification: FiBell };

const TeamRecentActivity = () => (
  <div className="tprof-timeline">
    {recentActivities.map((a, i) => {
      const Icon = iconMap[a.type] || FiCheck;
      return (
        <div key={a.id} className="tprof-tl-item">
          <div className="tprof-tl-icon"><Icon /></div>
          {i < recentActivities.length - 1 && <div className="tprof-tl-line"></div>}
          <div className="tprof-tl-content">
            <h6>{a.title}</h6>
            <p>{a.description}</p>
            <span>{a.relatedTo} • {a.dateTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);
export default TeamRecentActivity;