// src/components/taskDetails/TaskInfoBox.jsx
import React from 'react';
import { FiUser, FiFolder, FiCalendar, FiClock, FiFlag } from 'react-icons/fi';

const TaskInfoBox = ({ task }) => (
  <div className="td-info-box">
    <h6>Task Information</h6>
    <div className="td-info-grid">
      <div><FiFolder /><span>Project:</span><strong>{task.project}</strong></div>
      <div><FiUser /><span>Assigned:</span><strong>{task.assignedTo}</strong></div>
      <div><FiCalendar /><span>Start:</span><strong>{task.startDate}</strong></div>
      <div><FiCalendar /><span>Deadline:</span><strong>{task.deadline}</strong></div>
      <div><FiClock /><span>Estimated:</span><strong>{task.estimatedHours}h</strong></div>
      <div><FiClock /><span>Spent:</span><strong>{task.timeSpent}h</strong></div>
      <div><FiFlag /><span>Created By:</span><strong>{task.createdBy}</strong></div>
      <div><FiCalendar /><span>Last Updated:</span><strong>{task.lastUpdated}</strong></div>
    </div>
  </div>
);

export default TaskInfoBox;