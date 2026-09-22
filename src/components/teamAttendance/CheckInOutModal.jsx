// src/components/teamAttendance/CheckInOutModal.jsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { workModes, shifts } from '../../data/teamAttendanceData';

const CheckInOutModal = ({ show, onClose, isCheckIn, onSubmit }) => {
  const [form, setForm] = useState({ workMode: 'Office', shift: 'General Shift', note: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.workMode) e.workMode = 'Required';
    if (!form.shift) e.shift = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit({ ...form, isCheckIn }); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{isCheckIn ? 'Check In' : 'Check Out'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Date</label><input type="text" className="form-control" value={new Date().toISOString().split('T')[0]} readOnly /></div>
        <div className="mb-3"><label className="form-label">Time</label><input type="text" className="form-control" value={new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} readOnly /></div>
        <div className="mb-3"><label className="form-label">Work Mode *</label><select className={`form-select ${errors.workMode ? 'is-invalid' : ''}`} value={form.workMode} onChange={(e) => setForm(p => ({ ...p, workMode: e.target.value }))}>{workModes.map(m => <option key={m} value={m}>{m}</option>)}</select>{errors.workMode && <div className="invalid-feedback">{errors.workMode}</div>}</div>
        <div className="mb-3"><label className="form-label">Shift *</label><select className={`form-select ${errors.shift ? 'is-invalid' : ''}`} value={form.shift} onChange={(e) => setForm(p => ({ ...p, shift: e.target.value }))}>{shifts.map(s => <option key={s} value={s}>{s}</option>)}</select>{errors.shift && <div className="invalid-feedback">{errors.shift}</div>}</div>
        <div className="mb-3"><label className="form-label">Note</label><textarea className="form-control" rows="2" value={form.note} onChange={(e) => setForm(p => ({ ...p, note: e.target.value }))}></textarea></div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className={`btn ${isCheckIn ? 'btn-success' : 'btn-danger'}`}>{isCheckIn ? 'Check In' : 'Check Out'}</button></div></form>
    </div></div></div>
  );
};
export default CheckInOutModal;