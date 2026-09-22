// src/components/teamAttendance/AttendanceStatusBadge.jsx
import React from 'react';
const AttendanceStatusBadge = ({ status }) => {
  const map = { 'Present': 'ta-status-present', 'Absent': 'ta-status-absent', 'Late': 'ta-status-late', 'Half Day': 'ta-status-halfday', 'On Leave': 'ta-status-leave', 'Holiday': 'ta-status-holiday', 'Checked In': 'ta-status-checkedin', 'Checked Out': 'ta-status-checkedout', 'Not Checked In': 'ta-status-notchecked', 'Pending': 'ta-status-pending', 'Approved': 'ta-status-approved', 'Rejected': 'ta-status-rejected', 'Cancelled': 'ta-status-cancelled' };
  return <span className={`ta-badge ${map[status] || ''}`}>{status}</span>;
};
export default AttendanceStatusBadge;