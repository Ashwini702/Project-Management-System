// src/components/taskDetails/TaskActivityTimeline.jsx
import React from 'react';
import { FiPlus, FiUserPlus, FiCheckSquare, FiUpload, FiMessageSquare, FiEdit3, FiFlag, FiCheck } from 'react-icons/fi';

const iconMap = { create: FiPlus, assign: FiUserPlus, checklist: FiCheckSquare, upload: FiUpload, comment: FiMessageSquare, status: FiEdit3, priority: FiFlag, complete: FiCheck };

const TaskActivityTimeline = ({ activities }) => (
  <div className="td-timeline">
    {activities.map((a, i) => {
      const Icon = iconMap[a.type] || FiEdit3;
      return (
        <div key={a.id} className="td-tl-item">
          <div className="td-tl-icon"><Icon /></div>
          {i < activities.length - 1 && <div className="td-tl-line"></div>}
          <div className="td-tl-content">
            <h6>{a.title}</h6>
            <p>{a.description}</p>
            <span>{a.user} • {a.dateTime}</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default TaskActivityTimeline;