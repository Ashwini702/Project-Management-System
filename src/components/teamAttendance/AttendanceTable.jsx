// src/components/teamAttendance/AttendanceTable.jsx
import React from 'react';
import { FiEye, FiEdit2 } from 'react-icons/fi';
import AttendanceStatusBadge from './AttendanceStatusBadge';

const AttendanceTable = ({ records, onView, onAddNote }) => (
  <div className="table-responsive">
    <table className="table ta-table">
      <thead><tr><th>Date</th><th>Day</th><th>Shift</th><th>Mode</th><th>Check In</th><th>Check Out</th><th>Break</th><th>Hours</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {records.length === 0 ? <tr><td colSpan="10" className="text-center py-5"><p className="text-muted">No records found</p></td></tr> :
          records.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td><td>{r.day}</td><td>{r.shift}</td><td>{r.workMode}</td>
              <td>{r.checkIn}</td><td>{r.checkOut}</td><td>{r.breakTime}</td><td>{r.totalHours}</td>
              <td><AttendanceStatusBadge status={r.status} /></td>
              <td><div className="action-buttons">
                <button className="action-btn-icon view-btn" onClick={() => onView(r)}><FiEye /></button>
                <button className="action-btn-icon note-btn" onClick={() => onAddNote(r)}><FiEdit2 /></button>
              </div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);
export default AttendanceTable;