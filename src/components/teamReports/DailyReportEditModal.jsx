// src/components/teamReports/DailyReportEditModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { projects, workTypes } from '../../data/teamDailyReportData';

const DailyReportEditModal = ({ show, onClose, report, onSubmit }) => {
  const [form, setForm] = useState(report || {});
  const [errors, setErrors] = useState({});

  useEffect(() => { if (report) setForm(report); }, [report, show]);

  const validate = () => {
    const e = {};
    if (!form.reportTitle?.trim()) e.reportTitle = 'Required';
    if (!form.projectName) e.projectName = 'Required';
    if (!form.taskName?.trim()) e.taskName = 'Required';
    if (!form.workSummary?.trim()) e.workSummary = 'Required';
    if (!form.totalWorkHours || form.totalWorkHours <= 0) e.totalWorkHours = 'Required';
    if (form.taskProgress < 0 || form.taskProgress > 100) e.taskProgress = '0-100';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(report.id, form); };

  if (!show || !report) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Edit Report</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-6 mb-3"><label className="form-label">Title *</label><input type="text" name="reportTitle" className={`form-control ${errors.reportTitle ? 'is-invalid' : ''}`} value={form.reportTitle} onChange={handleChange} />{errors.reportTitle && <div className="invalid-feedback">{errors.reportTitle}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="projectName" className={`form-select ${errors.projectName ? 'is-invalid' : ''}`} value={form.projectName} onChange={handleChange}>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Task *</label><input type="text" name="taskName" className={`form-control ${errors.taskName ? 'is-invalid' : ''}`} value={form.taskName} onChange={handleChange} />{errors.taskName && <div className="invalid-feedback">{errors.taskName}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Work Type</label><select name="workType" className="form-select" value={form.workType} onChange={handleChange}>{workTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="col-md-12 mb-3"><label className="form-label">Work Summary *</label><textarea name="workSummary" className={`form-control ${errors.workSummary ? 'is-invalid' : ''}`} rows="3" value={form.workSummary} onChange={handleChange}></textarea>{errors.workSummary && <div className="invalid-feedback">{errors.workSummary}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Completed Work</label><textarea name="completedWork" className="form-control" rows="2" value={form.completedWork} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Blockers</label><textarea name="blockers" className="form-control" rows="2" value={form.blockers} onChange={handleChange}></textarea></div>
        <div className="col-md-4 mb-3"><label className="form-label">Total Hours *</label><input type="number" name="totalWorkHours" className={`form-control ${errors.totalWorkHours ? 'is-invalid' : ''}`} step="0.25" value={form.totalWorkHours} onChange={handleChange} />{errors.totalWorkHours && <div className="invalid-feedback">{errors.totalWorkHours}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Productive Hours</label><input type="number" name="productiveHours" className="form-control" step="0.25" value={form.productiveHours} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Progress (%)</label><input type="number" name="taskProgress" className={`form-control ${errors.taskProgress ? 'is-invalid' : ''}`} min="0" max="100" value={form.taskProgress} onChange={handleChange} />{errors.taskProgress && <div className="invalid-feedback">{errors.taskProgress}</div>}</div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Save</button></div></form>
    </div></div></div>
  );
};
export default DailyReportEditModal;