// src/components/teamDashboard/AttendanceBox.jsx
import React, { useState } from 'react';
import { FiLogIn, FiLogOut, FiCoffee } from 'react-icons/fi';
import { attendanceData, attendanceHistory } from '../../data/teamDashboardData';

const AttendanceBox = ({ onAlert }) => {
  const [attendance, setAttendance] = useState(attendanceData);

  const checkIn = () => { setAttendance(p => ({ ...p, todayStatus: 'Present', checkInTime: '09:00 AM' })); onAlert('Checked in successfully!', 'success'); };
  const checkOut = () => { setAttendance(p => ({ ...p, checkOutTime: '06:00 PM', totalHours: '8h 30m' })); onAlert('Checked out successfully!', 'success'); };
  const markBreak = () => onAlert('Break marked!', 'info');

  return (
    <div className="tm-attendance-box">
      <h6>Attendance</h6>
      <div className="tm-attendance-status">
        <div className="tm-att-stat"><span>Status</span><strong className="text-success">{attendance.todayStatus}</strong></div>
        <div className="tm-att-stat"><span>Check In</span><strong>{attendance.checkInTime}</strong></div>
        <div className="tm-att-stat"><span>Check Out</span><strong>{attendance.checkOutTime}</strong></div>
        <div className="tm-att-stat"><span>Hours</span><strong>{attendance.totalHours}</strong></div>
        <div className="tm-att-stat"><span>Break</span><strong>{attendance.breakTime}</strong></div>
      </div>
      <div className="tm-att-actions">
        <button className="tm-att-btn checkin" onClick={checkIn}><FiLogIn /> Check In</button>
        <button className="tm-att-btn checkout" onClick={checkOut}><FiLogOut /> Check Out</button>
        <button className="tm-att-btn break" onClick={markBreak}><FiCoffee /> Break</button>
      </div>
      <h6 className="mt-3">History</h6>
      <div className="table-responsive">
        <table className="table tm-table">
          <thead><tr><th>Date</th><th>In</th><th>Out</th><th>Status</th><th>Hours</th></tr></thead>
          <tbody>{attendanceHistory.map((a, i) => <tr key={i}><td>{a.date}</td><td>{a.checkIn}</td><td>{a.checkOut}</td><td>{a.status}</td><td>{a.hours}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};
export default AttendanceBox;