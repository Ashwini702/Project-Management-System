// src/components/teamDashboard/DailyWorkReportBox.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { dailyReports, myProjects, myTasks } from '../../data/teamDashboardData';
import TaskStatusBadge from './TaskStatusBadge';

const DailyWorkReportBox = ({ onAlert }) => {
  const [form, setForm] = useState({ date: '', project: '', task: '', hours: '', status: 'In Progress', description: '', challenges: '', plan: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.project || !form.task || !form.description.trim() || !form.hours) return onAlert('All required fields must be filled.', 'danger');
    setForm({ date: '', project: '', task: '', hours: '', status: 'In Progress', description: '', challenges: '', plan: '' });
    onAlert('Daily work report submitted successfully!', 'success');
  };

  return (
    <div className="tm-report-box">
      <h6>Daily Work Report</h6>
      <form onSubmit={handleSubmit} className="tm-report-form">
        <div className="row">
          <div className="col-md-4 mb-2"><input type="date" className="form-control" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} /></div>
          <div className="col-md-4 mb-2"><select className="form-select" value={form.project} onChange={(e) => setForm(p => ({ ...p, project: e.target.value }))}><option value="">Select Project</option>{myProjects.map(p => <option key={p.id} value={p.projectName}>{p.projectName}</option>)}</select></div>
          <div className="col-md-4 mb-2"><select className="form-select" value={form.task} onChange={(e) => setForm(p => ({ ...p, task: e.target.value }))}><option value="">Select Task</option>{myTasks.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}</select></div>
          <div className="col-md-3 mb-2"><input type="number" className="form-control" placeholder="Hours" value={form.hours} onChange={(e) => setForm(p => ({ ...p, hours: e.target.value }))} /></div>
          <div className="col-md-3 mb-2"><select className="form-select" value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}><option>Pending</option><option>In Progress</option><option>Completed</option><option>Blocked</option></select></div>
          <div className="col-md-6 mb-2"><input type="text" className="form-control" placeholder="Work Description" value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} /></div>
          <div className="col-md-6 mb-2"><input type="text" className="form-control" placeholder="Challenges/Issues" value={form.challenges} onChange={(e) => setForm(p => ({ ...p, challenges: e.target.value }))} /></div>
          <div className="col-md-6 mb-2"><input type="text" className="form-control" placeholder="Tomorrow's Plan" value={form.plan} onChange={(e) => setForm(p => ({ ...p, plan: e.target.value }))} /></div>
        </div>
        <button type="submit" className="btn btn-primary"><FiSend /> Submit Report</button>
      </form>
      <h6 className="mt-4">Recent Reports</h6>
      {dailyReports.map(r => (
        <div key={r.id} className="tm-report-item"><strong>{r.date}</strong> - {r.project} / {r.task} <span className="text-muted">({r.hours}h)</span> <TaskStatusBadge status={r.status} /></div>
      ))}
    </div>
  );
};
export default DailyWorkReportBox;
