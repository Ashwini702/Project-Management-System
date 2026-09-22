// src/components/teamAttendance/LeaveBalanceBox.jsx
import React from 'react';
import { leaveBalance, leaveRequests } from '../../data/teamAttendanceData';
import AttendanceStatusBadge from './AttendanceStatusBadge';

const LeaveBalanceBox = () => (
  <div>
    <h6 className="mb-3">Leave Balance</h6>
    <div className="ta-leave-grid">
      {leaveBalance.map(l => (
        <div key={l.id} className="ta-leave-card">
          <h6>{l.leaveType}</h6>
          <div className="ta-leave-stats">
            <span>Used: {l.used}</span><span>Remaining: {l.remaining}</span>
          </div>
          <div className="progress ta-progress mb-1"><div className="progress-bar" style={{ width: `${(l.used / l.totalAllowed) * 100}%`, backgroundColor: l.remaining > 3 ? 'var(--success-color)' : 'var(--warning-color)' }}></div></div>
          <small>{l.remaining}/{l.totalAllowed} remaining {l.pending > 0 && `• ${l.pending} pending`}</small>
        </div>
      ))}
    </div>
    <h6 className="mt-4 mb-2">Leave Request History</h6>
    <div className="table-responsive">
      <table className="table ta-table">
        <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th><th>Applied</th></tr></thead>
        <tbody>{leaveRequests.map(r => <tr key={r.id}><td>{r.leaveType}</td><td>{r.fromDate}</td><td>{r.toDate}</td><td>{r.totalDays}</td><td>{r.reason}</td><td><AttendanceStatusBadge status={r.status} /></td><td>{r.appliedDate}</td></tr>)}</tbody>
      </table>
    </div>
  </div>
);
export default LeaveBalanceBox;