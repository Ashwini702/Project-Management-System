// src/components/teamReports/DailyReportForm.jsx
import React, { useState } from 'react';
import { FiSave, FiSend } from 'react-icons/fi';
import { projects, workTypes } from '../../data/teamDailyReportData';

const DailyReportForm = ({ onSubmit, onDraft, onCancel }) => {
  const initial = { reportDate: '', reportTitle: '', projectName: '', taskName: '', workType: 'Development', workSummary: '', completedWork: '', pendingWork: '', blockers: '', tomorrowPlan: '', startTime: '09:00', endTime: '18:00', breakTime: 30, totalWorkHours: 8, productiveHours: 7, overtimeHours: 0, taskProgress: 0, taskStatus: 'In Progress' };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.reportDate) e.reportDate = 'Required';
    if (!form.reportTitle.trim()) e.reportTitle = 'Required';
    if (!form.projectName) e.projectName = 'Required';
    if (!form.taskName.trim()) e.taskName = 'Required';
    if (!form.workSummary.trim()) e.workSummary = 'Required';
    if (!form.completedWork.trim()) e.completedWork = 'Required';
    if (!form.totalWorkHours || form.totalWorkHours <= 0) e.totalWorkHours = 'Required';
    if (form.taskProgress < 0 || form.taskProgress > 100) e.taskProgress = '0-100';
    if (!form.taskStatus) e.taskStatus = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' })); };

  const handleSubmit = (e, isDraft) => {
    e.preventDefault();
    if (isDraft) { onDraft({ ...form }); setForm(initial); return; }
    if (validate()) { onSubmit({ ...form }); setForm(initial); }
  };

  return (
    <form className="dashboard-form tdr-form">
      <div className="modal-body dashboard-form-body">
        <div className="row dashboard-form-grid">
        <div className="col-md-4 mb-3"><label className="form-label">Report Date *</label><input type="date" name="reportDate" className={`form-control ${errors.reportDate ? 'is-invalid' : ''}`} value={form.reportDate} onChange={handleChange} />{errors.reportDate && <div className="invalid-feedback">{errors.reportDate}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Report Title *</label><input type="text" name="reportTitle" className={`form-control ${errors.reportTitle ? 'is-invalid' : ''}`} value={form.reportTitle} onChange={handleChange} />{errors.reportTitle && <div className="invalid-feedback">{errors.reportTitle}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Work Type *</label><select name="workType" className="form-select" value={form.workType} onChange={handleChange}>{workTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="projectName" className={`form-select ${errors.projectName ? 'is-invalid' : ''}`} value={form.projectName} onChange={handleChange}><option value="">Select</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.projectName && <div className="invalid-feedback">{errors.projectName}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Task *</label><input type="text" name="taskName" className={`form-control ${errors.taskName ? 'is-invalid' : ''}`} value={form.taskName} onChange={handleChange} />{errors.taskName && <div className="invalid-feedback">{errors.taskName}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Work Summary *</label><textarea name="workSummary" className={`form-control ${errors.workSummary ? 'is-invalid' : ''}`} rows="3" value={form.workSummary} onChange={handleChange}></textarea>{errors.workSummary && <div className="invalid-feedback">{errors.workSummary}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Completed Work *</label><textarea name="completedWork" className={`form-control ${errors.completedWork ? 'is-invalid' : ''}`} rows="2" value={form.completedWork} onChange={handleChange}></textarea>{errors.completedWork && <div className="invalid-feedback">{errors.completedWork}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Pending Work</label><textarea name="pendingWork" className="form-control" rows="2" value={form.pendingWork} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Blockers/Issues</label><textarea name="blockers" className="form-control" rows="2" value={form.blockers} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Tomorrow's Plan</label><textarea name="tomorrowPlan" className="form-control" rows="2" value={form.tomorrowPlan} onChange={handleChange}></textarea></div>
        <div className="col-md-3 mb-3"><label className="form-label">Start Time</label><input type="time" name="startTime" className="form-control" value={form.startTime} onChange={handleChange} /></div>
        <div className="col-md-3 mb-3"><label className="form-label">End Time</label><input type="time" name="endTime" className="form-control" value={form.endTime} onChange={handleChange} /></div>
        <div className="col-md-3 mb-3"><label className="form-label">Break (min)</label><input type="number" name="breakTime" className="form-control" value={form.breakTime} onChange={handleChange} /></div>
        <div className="col-md-3 mb-3"><label className="form-label">Total Hours *</label><input type="number" name="totalWorkHours" className={`form-control ${errors.totalWorkHours ? 'is-invalid' : ''}`} step="0.25" value={form.totalWorkHours} onChange={handleChange} />{errors.totalWorkHours && <div className="invalid-feedback">{errors.totalWorkHours}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Productive Hours</label><input type="number" name="productiveHours" className="form-control" step="0.25" value={form.productiveHours} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Overtime Hours</label><input type="number" name="overtimeHours" className="form-control" step="0.25" value={form.overtimeHours} onChange={handleChange} /></div>
        <div className="col-md-4 mb-3"><label className="form-label">Task Progress (%) *</label><input type="number" name="taskProgress" className={`form-control ${errors.taskProgress ? 'is-invalid' : ''}`} min="0" max="100" value={form.taskProgress} onChange={handleChange} />{errors.taskProgress && <div className="invalid-feedback">{errors.taskProgress}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Task Status *</label><select name="taskStatus" className={`form-select ${errors.taskStatus ? 'is-invalid' : ''}`} value={form.taskStatus} onChange={handleChange}><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Blocked</option></select>{errors.taskStatus && <div className="invalid-feedback">{errors.taskStatus}</div>}</div>
        </div>
      </div>
      <div className="modal-footer dashboard-form-footer">
        <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn btn-outline-primary" onClick={(e) => handleSubmit(e, true)}><FiSave /> Save as Draft</button>
        <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e, false)}><FiSend /> Submit Report</button>
      </div>
    </form>
  );
};
export default DailyReportForm;

