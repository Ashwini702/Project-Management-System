// src/components/teamProfile/TeamPerformanceBox.jsx
import React from 'react';
import TeamStatusBadge from './TeamStatusBadge';
import { performanceData } from '../../data/teamProfileData';

const TeamPerformanceBox = () => {
  const items = [
    { label: 'Productivity', value: performanceData.productivityScore, color: 'var(--primary-color)' },
    { label: 'Task Completion', value: performanceData.taskCompletionRate, color: 'var(--success-color)' },
    { label: 'Attendance', value: performanceData.attendanceRate, color: 'var(--warning-color)' },
    { label: 'Deadline Success', value: performanceData.deadlineSuccessRate, color: 'var(--accent-purple)' },
    { label: 'Report Rate', value: performanceData.dailyReportRate, color: 'var(--info-color)' }
  ];

  return (
    <div>
      <div className="tprof-perf-grid">
        {items.map(item => (
          <div key={item.label} className="tprof-perf-card">
            <h6>{item.label}</h6>
            <h3>{item.value}%</h3>
            <div className="progress tprof-progress"><div className="progress-bar" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div></div>
          </div>
        ))}
      </div>
      <div className="tprof-perf-summary mt-3">
        <span>Performance Grade:</span>
        <TeamStatusBadge status={performanceData.performanceGrade} type="grade" />
        <span className="ms-3">Tasks: {performanceData.completedTasks} done, {performanceData.pendingTasks} pending, {performanceData.overdueTasks} overdue</span>
      </div>
    </div>
  );
};
export default TeamPerformanceBox;