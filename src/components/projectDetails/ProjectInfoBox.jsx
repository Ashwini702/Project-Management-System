// src/components/projectDetails/ProjectInfoBox.jsx
import React from 'react';
import { FiUser, FiFolder, FiCalendar, FiDollarSign, FiClock } from 'react-icons/fi';

const ProjectInfoBox = ({ project }) => (
  <div className="pd-info-box">
    <h6>Project Information</h6>
    <div className="pd-info-grid">
      <div><FiUser /><span>Manager:</span><strong>{project.manager}</strong></div>
      <div><FiFolder /><span>Category:</span><strong>{project.category}</strong></div>
      <div><FiCalendar /><span>Start:</span><strong>{project.startDate}</strong></div>
      <div><FiCalendar /><span>End:</span><strong>{project.endDate}</strong></div>
      <div><FiDollarSign /><span>Budget:</span><strong>₹{project.budget.toLocaleString('en-IN')}</strong></div>
      <div><FiClock /><span>Last Updated:</span><strong>{project.lastUpdated}</strong></div>
    </div>
  </div>
);

export default ProjectInfoBox;