// src/components/teamAttendance/LeaveRequestModal.jsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const LeaveRequestModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({ leaveType: 'Casual Leave', fromDate: '', toDate: '', reason: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.leaveType) e.leaveType = 'Required';
    if (!form.fromDate) e.fromDate = 'Required';
    if (!form.toDate) e.toDate = 'Required';
    if (!form.reason.trim()) e.reason = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) { onSubmit(form); setForm({ leaveType: 'Casual Leave', fromDate: '', toDate: '', reason: '' }); } };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Apply Leave</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Leave Type *</label><select className={`form-select ${errors.leaveType ? 'is-invalid' : ''}`} value={form.leaveType} onChange={(e) => setForm(p => ({ ...p, leaveType: e.target.value }))}><option>Casual Leave</option><option>Sick Leave</option><option>Paid Leave</option><option>Unpaid Leave</option><option>Work From Home</option><option>Half Day</option></select>{errors.leaveType && <div className="invalid-feedback">{errors.leaveType}</div>}</div>
        <div className="mb-3"><label className="form-label">From Date *</label><input type="date" className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`} value={form.fromDate} onChange={(e) => setForm(p => ({ ...p, fromDate: e.target.value }))} />{errors.fromDate && <div className="invalid-feedback">{errors.fromDate}</div>}</div>
        <div className="mb-3"><label className="form-label">To Date *</label><input type="date" className={`form-control ${errors.toDate ? 'is-invalid' : ''}`} value={form.toDate} onChange={(e) => setForm(p => ({ ...p, toDate: e.target.value }))} />{errors.toDate && <div className="invalid-feedback">{errors.toDate}</div>}</div>
        <div className="mb-3"><label className="form-label">Reason *</label><textarea className={`form-control ${errors.reason ? 'is-invalid' : ''}`} rows="3" value={form.reason} onChange={(e) => setForm(p => ({ ...p, reason: e.target.value }))}></textarea>{errors.reason && <div className="invalid-feedback">{errors.reason}</div>}</div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Submit</button></div></form>
    </div></div></div>
  );
};
export default LeaveRequestModal;