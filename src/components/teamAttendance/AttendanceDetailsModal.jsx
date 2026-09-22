// src/components/teamAttendance/AttendanceDetailsModal.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import AttendanceStatusBadge from './AttendanceStatusBadge';

const AttendanceDetailsModal = ({ show, onClose, record }) => {
  if (!show || !record) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Attendance Details - {record.date}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="ta-detail-badge"><AttendanceStatusBadge status={record.status} /></div>
        <div className="ta-detail-grid mt-3">
          <div><strong>Date:</strong> {record.date}</div><div><strong>Day:</strong> {record.day}</div>
          <div><strong>Shift:</strong> {record.shift}</div><div><strong>Mode:</strong> {record.workMode}</div>
          <div><strong>Check In:</strong> {record.checkIn}</div><div><strong>Check Out:</strong> {record.checkOut}</div>
          <div><strong>Break:</strong> {record.breakTime}</div><div><strong>Hours:</strong> {record.totalHours}</div>
          <div><strong>Productive:</strong> {record.productiveHours}</div><div><strong>Overtime:</strong> {record.overtimeHours}</div>
          <div><strong>Location:</strong> {record.location}</div><div><strong>Status:</strong> {record.approvalStatus}</div>
        </div>
        {record.note && <p className="mt-3"><strong>Note:</strong> {record.note}</p>}
        <p className="mt-2"><small>Last Updated: {record.lastUpdated}</small></p>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};
export default AttendanceDetailsModal;