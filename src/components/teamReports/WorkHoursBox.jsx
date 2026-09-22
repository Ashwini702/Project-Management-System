// src/components/teamReports/WorkHoursBox.jsx
import React from 'react';

const WorkHoursBox = ({ report }) => {
  if (!report) return null;
  return (
    <div className="tdr-hours-box">
      <h6>Time Tracking</h6>
      <div className="tdr-hours-grid">
        <div className="tdr-hours-item"><span>Start</span><strong>{report.startTime}</strong></div>
        <div className="tdr-hours-item"><span>End</span><strong>{report.endTime}</strong></div>
        <div className="tdr-hours-item"><span>Break</span><strong>{report.breakTime} min</strong></div>
        <div className="tdr-hours-item"><span>Total</span><strong>{report.totalWorkHours}h</strong></div>
        <div className="tdr-hours-item"><span>Productive</span><strong className="text-success">{report.productiveHours}h</strong></div>
        <div className="tdr-hours-item"><span>Overtime</span><strong className="text-danger">{report.overtimeHours}h</strong></div>
      </div>
    </div>
  );
};
export default WorkHoursBox;