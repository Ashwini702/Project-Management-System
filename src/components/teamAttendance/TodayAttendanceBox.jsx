// src/components/teamAttendance/TodayAttendanceBox.jsx
import React from 'react';
import { FiLogIn, FiLogOut, FiEdit2 } from 'react-icons/fi';
import AttendanceStatusBadge from './AttendanceStatusBadge';

const TodayAttendanceBox = ({ today, onCheckIn, onCheckOut, onAddNote }) => (
  <div className="ta-today-box">
    <h5>Today's Attendance</h5>
    <div className="ta-today-grid">
      <div className="ta-today-item"><span>Date</span><strong>{today.date}</strong></div>
      <div className="ta-today-item"><span>Status</span><AttendanceStatusBadge status={today.status} /></div>
      <div className="ta-today-item"><span>Check In</span><strong>{today.checkIn}</strong></div>
      <div className="ta-today-item"><span>Check Out</span><strong>{today.checkOut}</strong></div>
      <div className="ta-today-item"><span>Hours</span><strong>{today.totalHours}</strong></div>
      <div className="ta-today-item"><span>Break</span><strong>{today.breakTime}</strong></div>
      <div className="ta-today-item"><span>Mode</span><strong>{today.workMode}</strong></div>
      <div className="ta-today-item"><span>Location</span><strong>{today.location}</strong></div>
      {today.note && <div className="ta-today-item ta-today-full"><span>Note</span><strong>{today.note}</strong></div>}
    </div>
    <div className="ta-today-actions">
      <button className="btn btn-success btn-sm" onClick={onCheckIn}><FiLogIn /> Check In</button>
      <button className="btn btn-danger btn-sm" onClick={onCheckOut}><FiLogOut /> Check Out</button>
      <button className="btn btn-outline-primary btn-sm" onClick={onAddNote}><FiEdit2 /> Add Note</button>
    </div>
  </div>
);
export default TodayAttendanceBox;