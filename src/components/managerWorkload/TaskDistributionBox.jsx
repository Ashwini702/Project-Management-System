// src/components/managerWorkload/TaskDistributionBox.jsx
import React from 'react';
import { taskDistribution, projectTaskDistribution } from '../../data/managerWorkloadData';

const TaskDistributionBox = () => (
  <div className="mwl-task-dist">
    <div className="mwl-dist-grid">
      <div className="mwl-dist-card pending"><h4>{taskDistribution.pending}</h4><span>Pending</span></div>
      <div className="mwl-dist-card progress"><h4>{taskDistribution.inProgress}</h4><span>In Progress</span></div>
      <div className="mwl-dist-card review"><h4>{taskDistribution.underReview}</h4><span>Under Review</span></div>
      <div className="mwl-dist-card completed"><h4>{taskDistribution.completed}</h4><span>Completed</span></div>
      <div className="mwl-dist-card blocked"><h4>{taskDistribution.blocked}</h4><span>Blocked</span></div>
      <div className="mwl-dist-card overdue"><h4>{taskDistribution.overdue}</h4><span>Overdue</span></div>
    </div>
    <h6 className="mt-4 mb-3">Project-wise Distribution</h6>
    {projectTaskDistribution.map(p => (
      <div key={p.project} className="mwl-proj-dist-row">
        <div className="mwl-pdr-header">
          <span>{p.project}</span>
          <span className="mwl-pdr-progress">{p.progress}%</span>
        </div>
        <div className="progress mwl-progress mb-1"><div className="progress-bar" style={{ width: `${p.progress}%` }}></div></div>
        <div className="mwl-pdr-detail">
          <span>Assigned: {p.assigned}</span><span className="text-success">Done: {p.completed}</span>
          <span className="text-warning">Pending: {p.pending}</span>
          {p.overdue > 0 && <span className="text-danger">Overdue: {p.overdue}</span>}
        </div>
      </div>
    ))}
  </div>
);
export default TaskDistributionBox;