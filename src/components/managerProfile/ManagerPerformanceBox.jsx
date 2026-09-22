// src/components/managerProfile/ManagerPerformanceBox.jsx
import React from 'react';
import ManagerStatusBadge from './ManagerStatusBadge';

const ManagerPerformanceBox = ({ performance }) => (
  <div>
    <div className="mp-perf-summary">
      <div className="mp-perf-card"><h6>Productivity</h6><h3>{performance.productivityScore}%</h3><div className="progress mp-progress"><div className="progress-bar" style={{ width: `${performance.productivityScore}%` }}></div></div></div>
      <div className="mp-perf-card"><h6>Project Completion</h6><h3>{performance.projectCompletionRate}%</h3><div className="progress mp-progress"><div className="progress-bar bg-success" style={{ width: `${performance.projectCompletionRate}%` }}></div></div></div>
      <div className="mp-perf-card"><h6>Task Completion</h6><h3>{performance.taskCompletionRate}%</h3><div className="progress mp-progress"><div className="progress-bar bg-info" style={{ width: `${performance.taskCompletionRate}%` }}></div></div></div>
      <div className="mp-perf-card"><h6>Team Efficiency</h6><h3>{performance.teamEfficiency}%</h3><div className="progress mp-progress"><div className="progress-bar bg-warning" style={{ width: `${performance.teamEfficiency}%` }}></div></div></div>
      <div className="mp-perf-card"><h6>Client Satisfaction</h6><h3>{performance.clientSatisfaction}%</h3><div className="progress mp-progress"><div className="progress-bar bg-purple" style={{ width: `${performance.clientSatisfaction}%`, background: 'var(--accent-purple)' }}></div></div></div>
      <div className="mp-perf-card"><h6>Deadline Success</h6><h3>{performance.deadlineSuccessRate}%</h3><div className="progress mp-progress"><div className="progress-bar bg-success" style={{ width: `${performance.deadlineSuccessRate}%` }}></div></div></div>
    </div>
    <div className="mp-perf-grade mt-3">
      <span>Performance Grade:</span>
      <ManagerStatusBadge status={performance.performanceGrade} type="grade" />
      <span className="ms-2">Response Time: {performance.avgResponseTime}</span>
    </div>
    <div className="mp-monthly mt-3">
      <h6>Monthly Performance</h6>
      <div className="mp-monthly-bars">
        {performance.monthlyScores.map(m => (
          <div key={m.month} className="mp-monthly-bar-item">
            <div className="mp-monthly-bar" style={{ height: `${m.score}%` }}></div>
            <span>{m.month}</span>
            <small>{m.score}%</small>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default ManagerPerformanceBox;