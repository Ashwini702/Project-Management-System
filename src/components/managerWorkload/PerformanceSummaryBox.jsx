// src/components/managerWorkload/PerformanceSummaryBox.jsx
import React from 'react';
import { topPerformers, supportNeeded } from '../../data/managerWorkloadData';

const PerformanceSummaryBox = () => (
  <div className="mwl-perf-box">
    <h6>Top Performers</h6>
    {topPerformers.map(p => (
      <div key={p.name} className="mwl-perf-item">
        <div className="mwl-perf-avatar">{p.avatar}</div>
        <div className="mwl-perf-info">
          <strong>{p.name}</strong><span>{p.role}</span>
        </div>
        <div className="mwl-perf-stats">
          <span className="text-success">{p.completed} Done</span>
          <span className="text-warning">{p.pending} Pending</span>
          <span><strong>{p.performance}%</strong></span>
        </div>
      </div>
    ))}
    <h6 className="mt-4">Needs Support</h6>
    {supportNeeded.map(p => (
      <div key={p.name} className="mwl-perf-item overloaded">
        <div className="mwl-perf-avatar">{p.avatar}</div>
        <div className="mwl-perf-info">
          <strong>{p.name}</strong><span>{p.role}</span>
        </div>
        <div className="mwl-perf-stats">
          <span className="text-success">{p.completed} Done</span>
          <span className="text-danger">{p.pending} Pending</span>
          <span><strong className="text-danger">{p.workload}% WL</strong></span>
        </div>
      </div>
    ))}
  </div>
);
export default PerformanceSummaryBox;