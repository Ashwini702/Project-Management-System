// src/components/teamAttendance/MonthlyAttendanceSummary.jsx
import React from 'react';
import { monthlySummary } from '../../data/teamAttendanceData';
import WorkHoursProgressBar from './WorkHoursProgressBar';

const MonthlyAttendanceSummary = () => (
  <div className="ta-monthly">
    <div className="ta-monthly-grid">
      <div className="ta-monthly-card"><h6>Working Days</h6><h3>{monthlySummary.totalWorkingDays}</h3></div>
      <div className="ta-monthly-card"><h6>Present</h6><h3 className="text-success">{monthlySummary.presentDays}</h3></div>
      <div className="ta-monthly-card"><h6>Absent</h6><h3 className="text-danger">{monthlySummary.absentDays}</h3></div>
      <div className="ta-monthly-card"><h6>Late</h6><h3 className="text-warning">{monthlySummary.lateDays}</h3></div>
      <div className="ta-monthly-card"><h6>Half Days</h6><h3 className="text-purple" style={{ color: 'var(--accent-purple)' }}>{monthlySummary.halfDays}</h3></div>
      <div className="ta-monthly-card"><h6>Leave Days</h6><h3 className="text-primary">{monthlySummary.leaveDays}</h3></div>
    </div>
    <div className="ta-monthly-analytics mt-4">
      <div className="ta-analytics-card">
        <h6>Attendance Rate</h6>
        <h2>{monthlySummary.attendancePercentage}%</h2>
        <div className="progress ta-progress"><div className="progress-bar bg-success" style={{ width: `${monthlySummary.attendancePercentage}%` }}></div></div>
      </div>
      <div className="ta-analytics-card">
        <h6>Total Work Hours</h6>
        <h2>{monthlySummary.totalWorkHours}h</h2>
        <WorkHoursProgressBar hours={monthlySummary.avgWorkHoursPerDay} />
        <small>Avg: {monthlySummary.avgWorkHoursPerDay}h/day</small>
      </div>
      <div className="ta-analytics-card">
        <h6>Punctuality Score</h6>
        <h2>{monthlySummary.punctualityScore}%</h2>
        <div className="progress ta-progress"><div className="progress-bar" style={{ width: `${monthlySummary.punctualityScore}%`, backgroundColor: 'var(--primary-color)' }}></div></div>
      </div>
    </div>
  </div>
);
export default MonthlyAttendanceSummary;